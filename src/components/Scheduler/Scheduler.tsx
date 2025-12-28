import React, { useMemo, useState } from 'react'
import { Alert, Box, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Drawer, FormControl, FormControlLabel, FormLabel, Grid2, IconButton, MenuItem, OutlinedInput, Paper, Radio, RadioGroup, Select, SelectChangeEvent, Switch, TextField, Tooltip, Typography } from '@mui/material'
import { format, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from 'date-fns'
import DateFnsLocaleContext from './DateFnsLocaleContext'
import { enUS } from 'date-fns/locale/en-US'
import SchedulerToolbar from './Toolbar'
import MonthModeView from './MonthModeView'
import WeekModeView from './WeekModeView'
import DayModeView from './DayModeView'
import TimeLineModeView from './TimeLineModeView'
import { SchedulerEventCategoryIconEnum, type SchedulerEvent } from "../../Utils/Types";
import { apiHost } from '../../Utils/customFetch'
import axios from 'axios'
import { createTheme, styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PersonIcon from '@mui/icons-material/Person';
import ConfirmationDialog from '../Common/DialogBoxes/ConfirmationDialog'
import SnackbarCustomized from '../Common/BasicSnackbar/SnackbarCustomized'
import FormGrid from '../Common/StyledComponents/FormGrid'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from "dayjs";
import { type SchedulerEventCategory, SchedulerEventCategories } from '../../Utils/Types';
import SaveIcon from '@mui/icons-material/Save';
import EventIcon from '@mui/icons-material/Event';
import NumberField from '../../components/NumberField';
import { NumberFieldRootChangeEventDetails, NumberFieldRootCommitEventDetails } from '@base-ui-components/react/number-field'


type Props = {
  events?: SchedulerEvent[]
  defaultMode?: 'month' | 'week' | 'day' | 'timeline'
  locale?: string
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    minWidth: "300px"
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const initialEventState: SchedulerEvent = {
  id: '0',
  date: new Date().toISOString().split('T')[0], // yyyy-MM-dd
  title: '',
  category: SchedulerEventCategories[1],
  organizer: '',
  details: '',
  isAllDay: false,
  isRepeated: false,
  repeatInterval: 'Daily',
  repeatEvery: 1,
  repeatOnWeekday: 1,
  repeatEnd: "never",
  repeatEndOn: 1,
  repeatEndAfter: new Date().toISOString().slice(0, 16)
};

export default function Scheduler({ defaultMode = 'month', locale = 'en' }: Props) {
  const [mode, setMode] = useState<string>(defaultMode)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [eventsFromDb, setEvents] = React.useState({
    data: [] as SchedulerEvent[],
    timestamp: 0
  });
  const [openEventSummary, setOpenEventSummary] = React.useState(false);
  const [clickedEvent, setClickedEvent] = React.useState<SchedulerEvent | null>(initialEventState);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openToast, setOpenToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState(null);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const AUTO_REFRESH_DATA = false; // Set to true to enable auto-refreshing data every minute
  const EXPIRATION_TIME = 60000; // 1 minutes in milliseconds = 60000

  const handleEventSummaryOpen = (ev: SchedulerEvent) => {
    setOpenEventSummary(true);
    setClickedEvent(ev);
  };
  const handleEventSummaryClose = () => {
    setOpenEventSummary(false);
  };

  function getStartDateTime(ev: SchedulerEvent, includeTime: boolean = true, includeDate: boolean = true) {
    if (!ev) return null;
    return `${includeDate ? new Date(ev.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' }) : ''} ${includeTime ? ev.startHour : ''}`;
  }

  const dateLabel = useMemo(() => {
    if (mode === 'month') return format(selectedDate, 'MMMM yyyy')
    if (mode === 'week') return `Week of ${format(selectedDate, 'MMM d, yyyy')}`
    if (mode === 'day') return format(selectedDate, 'EEE, MMM d')
    return format(selectedDate, 'MMM d, yyyy')
  }, [selectedDate, mode])

  const onPrev = () => {
    if (mode === 'month') setSelectedDate(subMonths(selectedDate, 1))
    else if (mode === 'week') setSelectedDate(subWeeks(selectedDate, 1))
    else setSelectedDate(subDays(selectedDate, 1))
  }
  const onNext = () => {
    if (mode === 'month') setSelectedDate(addMonths(selectedDate, 1))
    else if (mode === 'week') setSelectedDate(addWeeks(selectedDate, 1))
    else setSelectedDate(addDays(selectedDate, 1))
  }
  const onToday = () => setSelectedDate(new Date())

  React.useEffect(() => {
    // 1. Create a controller for cleanup
    const controller = new AbortController();

    const fetchEvents = async () => {
      try {
        setLoading(true);
        // 2. Axios automatically parses JSON and throws on 4xx/5xx errors
        const response = await axios.get(`${apiHost}/schedulerEvents?sort=["date","asc"]`,
          { signal: controller.signal } // Link signal cancellation
        );
        setError(null);
        return response.data as SchedulerEvent[];
      } catch (err: any) {
        // 3. Check if the error was amaula abort to avoid state updates
        if (!axios.isCancel(err)) {
          setError(err.message || 'Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    };

    // 2. Initial check on mount or dependency change
    const timeElapsed = Date.now() - eventsFromDb.timestamp;
    if (eventsFromDb.data.length == 0 || (AUTO_REFRESH_DATA && (timeElapsed > EXPIRATION_TIME))) {
      fetchEvents().then(newData => setEvents({ data: newData, timestamp: Date.now() }));
    }

    // 3. Set a timer to trigger a re-fetch exactly when data expires
    const remainingTime = Math.max(0, EXPIRATION_TIME - timeElapsed);
    const timeoutId = setTimeout(() => {
      if (AUTO_REFRESH_DATA)
        fetchEvents().then(newData => setEvents({ data: newData, timestamp: Date.now() }));
    }, remainingTime);

    // 4. Cleanup function to abort fetch on unmount
    return () => {
      controller.abort();
      clearTimeout(timeoutId); // Important: Clear any pending timeouts
    }
  }, [eventsFromDb, EXPIRATION_TIME]); // Empty dependency array means this runs once on mount

  if (loading) return (
    <Typography>Loading...</Typography>
  );

  if (error) return (
    <Alert variant="outlined" severity="error">
      Error: {error.message}
    </Alert>
  );

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        handleEventSummaryClose();
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        setState({ ...state, [anchor]: open });
      };

  const deleteEvent = (ev: SchedulerEvent) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      handleEventSummaryClose();
      setOpenDeleteDialog(true); // Open the confirmation dialog
    }

  const confirmDelete = () => {
    if (clickedEvent !== null) {
      axios.delete(`${apiHost}/schedulerEvents/${clickedEvent.id}`)
        .then(response => {
          if (response.status !== 200) {
            throw new Error('Network response was not ok (status: ' + response.status + ')');
          }
          return response.data;
        })
        .then(() => {
          setClickedEvent(null);
          setEvents({
            data: [] as SchedulerEvent[],
            timestamp: 0
          });
          setToastMessage(`Event ${clickedEvent.id} deleted successfully!`);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
          setToastMessage(`Could not delete event ${clickedEvent.id}.`);
        })
        .finally(() => {
          setOpenToast(true);
        });
      setOpenDeleteDialog(false); // Close the dialog
    }
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false); // Close the dialog without deleting
  };

  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setClickedEvent({ ...clickedEvent, [name]: newValue });
  };

  const handleInputChangeNumeric = (value: number, eventDetails: NumberFieldRootChangeEventDetails, name: string) => {
    setClickedEvent({ ...clickedEvent, [name]: value });
  }

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const checked = event.target.checked;
    setClickedEvent({ ...clickedEvent, [name]: checked });
  }
  const pad = (n: number) => String(n).padStart(2, '0');

  const handleStartDateTimeChange = (newValue, context) => {
    if (!newValue) return;
    setClickedEvent({ ...clickedEvent, date: newValue.format("YYYY-MM-DD"), startHour: newValue.format("HH:mm") });
  };

  const handleRepeatEndAfterChange = (newValue, context) => {
    if (!newValue) return;
    setClickedEvent({ ...clickedEvent, repeatEndAfter: newValue.format("YYYY-MM-DD HH:mm") });
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    if (event.target.value === "0") return;
    const newEventCategory = SchedulerEventCategories.find(e => e.id === event.target.value);
    setClickedEvent({ ...clickedEvent, category: newEventCategory as SchedulerEventCategory });
  }

  const handleSubmit = evt => {
    evt.preventDefault();

    const isNew: boolean = (clickedEvent.id === "0");
    if (isNew) {
      clickedEvent.id = eventsFromDb.data.length > 0
        ? (Math.max(...eventsFromDb.data.map(event => Number(event.id))) + 1).toString()
        : "0";
    }

    axios({
      url: `${apiHost}/schedulerEvents${isNew ? "" : "/" + clickedEvent.id}`,
      method: isNew ? "POST" : "PUT",
      data: { ...clickedEvent },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(response => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error('Network response was not ok (status: ' + response.status + ')');
        }
        setClickedEvent(null);
        setEvents({
          data: [] as SchedulerEvent[],
          timestamp: 0
        });
        return response.data;
      })
      .then(() => {
        setToastMessage(`Event ${clickedEvent.id} ${isNew ? "created" : "updated"} successfully!`);
      })
      .catch(error => {
        //setError(error);
        setLoading(false);
        setToastMessage(`Event ${clickedEvent.id} could not be ${isNew ? "created" : "updated"}. \n${error}`);
      })
      .finally(() => {
        setOpenToast(true);
      });
    toggleDrawer("left", false)(evt);
  };

  const eventCategoryIcon = (evCat: SchedulerEventCategory) => {
    switch (evCat?.icon) {
      case SchedulerEventCategoryIconEnum.Code:
        return <LaptopMacIcon sx={{ color: `${evCat.chipColor} !important`, mr: 1 }} />;
      case SchedulerEventCategoryIconEnum.Eat:
        return <FastfoodIcon sx={{ color: `${evCat.chipColor} !important`, mr: 1 }} />;
      case SchedulerEventCategoryIconEnum.Sleep:
        return <HotelIcon sx={{ color: `${evCat.chipColor} !important`, mr: 1 }} />;
      case SchedulerEventCategoryIconEnum.Repeat:
        return <RepeatIcon sx={{ color: `${evCat.chipColor} !important`, mr: 1 }} />;
      case SchedulerEventCategoryIconEnum.Meet:
        return <GroupsIcon sx={{ color: `${evCat.chipColor} !important`, mr: 1 }} />;
      case SchedulerEventCategoryIconEnum.Call:
        return <LocalPhoneIcon sx={{ color: `${evCat.chipColor} !important`, mr: 1 }} />;
      case SchedulerEventCategoryIconEnum.Review:
        return <RateReviewIcon sx={{ color: `${evCat.chipColor} !important`, mr: 1 }} />;
      case SchedulerEventCategoryIconEnum.Onboarding:
        return <PersonAddIcon sx={{ color: `${evCat.chipColor} !important`, mr: 1 }} />;
      default:
        return null;
    }
  };

  // Extract unique owners by 'name' from the existing event list
  const uniqueOwners = [...new Set(eventsFromDb.data.map(ev => ev.organizer))].sort((a: string, b: string) => a.localeCompare(b));

  const handleOwnerChange = (event: SelectChangeEvent) => {
    if (event.target.value === "0") return;
    setClickedEvent({ ...clickedEvent, organizer: event.target.value as string });
  }

  const repeatTimelines: string[] = ["Daily", "Weekly", "Monthly", "Yearly"];

  const setRepeatOnWeekday = (event, day) => {
    setClickedEvent({ ...clickedEvent, repeatOnWeekday: day })
  }

  const openDetailsDrawer = (e: React.KeyboardEvent | React.MouseEvent) => {
    setClickedEvent(initialEventState);
    toggleDrawer("left", true)({} as React.MouseEvent);
  }
  //console.log(eventsFromDb);

  return (
    <Paper id="drawer-container" elevation={3} sx={{ borderRadius: "0.75rem", width: "100%", height: "100%", padding: "15px" }} style={{ position: "relative", overflow: "hidden" }}>
      <DateFnsLocaleContext.Provider value={enUS}>
        <SchedulerToolbar dateLabel={dateLabel} mode={mode} onPrev={onPrev} onNext={onNext} onToday={onToday} onModeChange={setMode} onAddClick={openDetailsDrawer} />
        {mode === 'month' && <MonthModeView date={selectedDate} events={eventsFromDb.data} onTaskClick={handleEventSummaryOpen} />}
        {mode === 'week' && <WeekModeView date={selectedDate} events={eventsFromDb.data} onTaskClick={handleEventSummaryOpen} />}
        {mode === 'day' && <DayModeView date={selectedDate} events={eventsFromDb.data} onTaskClick={handleEventSummaryOpen} />}
        {mode === 'timeline' && <TimeLineModeView date={selectedDate} events={eventsFromDb.data} onTaskClick={handleEventSummaryOpen} />}
      </DateFnsLocaleContext.Provider>
      <BootstrapDialog
        onClose={handleEventSummaryClose}
        aria-labelledby="customized-dialog-title"
        open={openEventSummary}
      >
        {/* Event summary dialog */}
        <DialogTitle sx={{ m: 0, p: 2, color: `${clickedEvent?.category.chipColor} !important`, display: "flex", flexDirection: "row", alignItems: "center", }} id="customized-dialog-title">
          {eventCategoryIcon(clickedEvent?.category)}<Box sx={{ ml: 1 }}>
            {clickedEvent?.category.label}&nbsp;</Box><Box sx={{ fontSize: "0.7em" }}>(id {clickedEvent?.id})</Box>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleEventSummaryClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: `${clickedEvent?.category.chipColor} !important`
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            {clickedEvent?.title}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-start", mt: 1 }}>
            <EventIcon sx={{ color: `${clickedEvent?.category.chipColor} !important`, mr: 1 }} />
            <Typography gutterBottom>
              {getStartDateTime(clickedEvent, false)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-start", mt: 1 }}>
            <ScheduleIcon sx={{ color: `${clickedEvent?.category.chipColor} !important`, mr: 1 }} />
            <Typography gutterBottom>
              {getStartDateTime(clickedEvent, true, false)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "start", mt: 1 }}>
            <PersonIcon sx={{ color: `${clickedEvent?.category.chipColor} !important`, mr: 1 }} />
            <Typography gutterBottom>
              {clickedEvent?.organizer}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Tooltip title="Edit scheduler event">
            <IconButton aria-label="edit" color="primary" onClick={toggleDrawer("left", true)} sx={{ color: `${clickedEvent?.category.chipColor} !important` }}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete scheduler event">
            <IconButton aria-label="delete" color="error" onClick={deleteEvent(clickedEvent)} sx={{ color: `${clickedEvent?.category.chipColor} !important` }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </DialogActions>
      </BootstrapDialog>
      {/* Drawer that handles editing the event */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        ModalProps={{
          container: document.getElementById("drawer-container"),
          style: { position: "absolute" }
        }}
        slotProps={{
          paper: {
            sx: {
              position: "absolute",
              transition: "width 0.4s ease-in-out",
              transitionDelay: '100ms', // small 0.1s pause before resizing
              width: clickedEvent?.isRepeated ? "900px" : "600px",
              height: "600px",
              borderRadius: "10px",
              padding: "15px",
            }
          },
          backdrop: { style: { position: "absolute" } }
        }}
      >
        <Typography variant="h4" sx={{ display: "flex", flexDirection: "row", alignItems: "center", mb: 2, color: `${clickedEvent?.category.chipColor} !important` }}>
          {eventCategoryIcon(clickedEvent?.category)}<Box sx={{ ml: 1 }}>Event details&nbsp;</Box><Box sx={{ fontSize: "0.7em" }}>(id {clickedEvent?.id})</Box>
          <IconButton
            aria-label="close"
            onClick={toggleDrawer("left", false)}
            sx={(theme) => ({
              position: 'absolute',
              right: 8,
              top: 8,
              color: `${clickedEvent?.category.chipColor} !important`
            })}
          >
            <CloseIcon />
          </IconButton>
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <form onSubmit={handleSubmit}>
          <Grid2 sx={{ display: "flex", flexDirection: "row" }}>
            <FormGrid size={clickedEvent?.isRepeated ? 7 : 12}>
              <Grid2 container spacing={2}>
                <FormGrid size={{ xs: 12 }}>
                  <FormLabel htmlFor="title" required>
                    Title
                  </FormLabel>
                  <OutlinedInput
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Event title"
                    required
                    size="small"
                    defaultValue={clickedEvent?.title}
                    onBlur={handleInput}
                  />
                </FormGrid>
                <FormGrid size={{ xs: 12 }}>
                  <FormLabel htmlFor="start-date-time" required>
                    Start date and time
                  </FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      name="start-date-time"
                      // Forces the clock selection UI to 24-hour format
                      ampm={false}
                      format="DD MMMM YYYY HH:mm"
                      //onError={(newError) => setErrorDate(newError)}
                      slotProps={{
                        actionBar: {
                          actions: ["cancel", "clear", "today", "accept"]
                        },
                        textField: {
                          helperText: "Time must be in 24 hour format if manually entered",
                          size: "small",
                          required: true,
                        },
                        openPickerButton: {
                          size: "small",
                          sx: { mr: "-13px" }
                        },
                      }}
                      ////minDate={startOfQ11990}
                      ////maxDate={endOfQ11990}
                      value={dayjs(`${clickedEvent?.date}T${clickedEvent?.startHour}`)}
                      onChange={handleStartDateTimeChange}
                    />
                  </LocalizationProvider>
                </FormGrid>
                <FormGrid size={{ xs: 12 }}>
                  <FormLabel htmlFor="category" required>
                    Category
                  </FormLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    name="category"
                    value={clickedEvent == null ? "0" : clickedEvent.category.id}
                    label="Category"
                    onChange={handleCategoryChange}
                    size="small"
                  >
                    <MenuItem value="0">Select a category</MenuItem>
                    {
                      SchedulerEventCategories.map((ev: SchedulerEventCategory) => (
                        <MenuItem key={ev.id} value={ev.id}>{eventCategoryIcon(ev)}{ev.label}</MenuItem>
                      ))
                    }
                  </Select>
                </FormGrid>
                <FormGrid size={6}>
                  <Box sx={{ alignItem: "start" }}>
                    <FormControlLabel
                      label="All day event"
                      labelPlacement="start"
                      control={<Switch aria-label="All day event" name="isAllDay" checked={clickedEvent?.isAllDay ?? false} onChange={handleSwitchChange} />}
                    />
                  </Box>
                </FormGrid>
                <FormGrid size={6}>
                  <Box sx={{ alignItem: "start" }}>
                    <FormControlLabel
                      label="Repeat"
                      labelPlacement="start"
                      control={<Switch aria-label="Repeat event" name="isRepeated" checked={clickedEvent?.isRepeated ?? false} onChange={handleSwitchChange} />}
                    />
                  </Box>
                </FormGrid>
                <FormGrid size={{ xs: 12 }}>
                  <FormLabel htmlFor="details">
                    Details
                  </FormLabel>
                  <OutlinedInput
                    id="details"
                    name="details"
                    type="text"
                    placeholder="Event details"
                    multiline={true}
                    rows={5}
                    defaultValue={clickedEvent?.details}
                    onBlur={handleInput}
                  />
                </FormGrid>
                <FormGrid size={{ xs: 12 }}>
                  <FormLabel htmlFor="owner" required>
                    Owner
                  </FormLabel>
                  <Select
                    id="owner"
                    name="owner"
                    value={clickedEvent == null ? "0" : clickedEvent.organizer}
                    label="Owner"
                    onChange={handleOwnerChange}
                    size="small"
                  >
                    <MenuItem value="0">Select an owner</MenuItem>
                    {
                      uniqueOwners.map((user: string, index) => (
                        <MenuItem key={index} value={user}>{user}</MenuItem>
                      ))
                    }
                  </Select>
                  <Divider sx={{ mt: 2 }} />
                </FormGrid>

                <FormGrid size={10} />
                <FormGrid size={2} sx={{ alignItems: "end" }}>
                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ color: `${clickedEvent?.category.chipColor} !important` }}
                  >
                    Save <SaveIcon sx={{ marginLeft: "5px" }} />
                  </Button>
                </FormGrid>
              </Grid2>
            </FormGrid>
            <FormGrid size={clickedEvent?.isRepeated ? 5 : 0}>
              <Grid2 container spacing={2} sx={{ ml: 2, display: clickedEvent?.isRepeated ? "block" : "none" }}>
                <FormGrid size={12} >
                  <FormLabel htmlFor="repeat">
                    Repeat
                  </FormLabel>
                  <Select
                    id="repeatInterval"
                    name="repeatInterval"
                    value={clickedEvent?.repeatInterval ?? "Daily"}//{clickedEvent == null ? "0" : clickedEvent.repeatInterval}
                    label="Repeat Interval"
                    onChange={handleInput}
                    size="small"
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="0">Select a timeline</MenuItem>
                    {
                      repeatTimelines.map((timeline: string, index) => (
                        <MenuItem key={index} value={timeline}>{timeline}</MenuItem>
                      ))
                    }
                  </Select>
                </FormGrid>
                <FormGrid size={12} >
                  <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "baseline" }}>
                    <FormLabel htmlFor="repeatInterval">
                      Repeat every
                    </FormLabel>
                    <NumberField id="repeatEvery" name="repeatEvery" size="small" min={1} max={(() => {
                      switch (clickedEvent?.repeatInterval.toLowerCase()) {
                        case "daily":
                          return 29;
                          break;
                        case "weekly":
                          return 52;
                          break;
                        case "monthly":
                          return 12;
                          break;
                        case "yearly":
                          return 10;
                          break;
                        default:
                          return 1;
                          break;
                      }
                    })()}
                      width="125px"
                      value={clickedEvent?.repeatEvery ?? 1}
                      onValueChange={(value, event) => handleInputChangeNumeric(value, event, "repeatEvery")}
                      showHelperText={true}
                    />
                    <Typography color="text.secondary">{(() => {
                      switch (clickedEvent?.repeatInterval.toLowerCase()) {
                        case "daily":
                          return "day";
                          break;
                        case "weekly":
                          return "week";
                          break;
                        case "monthly":
                          return "month";
                          break;
                        case "yearly":
                          return "year";
                          break;
                        default:
                          return "...";
                          break;
                      }
                    })()}(s) on:</Typography>
                  </Box>
                </FormGrid>
                <FormGrid size={12} >
                  <ButtonGroup variant="outlined" aria-label="Basic button group" sx={{ mt: 2 }}>
                    <Button variant={clickedEvent?.repeatOnWeekday === 1 ? "contained" : "outlined"} onClick={(event) => setRepeatOnWeekday(event, 1)}>SUN</Button>
                    <Button variant={clickedEvent?.repeatOnWeekday === 2 ? "contained" : "outlined"} onClick={(event) => setRepeatOnWeekday(event, 2)}>MON</Button>
                    <Button variant={clickedEvent?.repeatOnWeekday === 3 ? "contained" : "outlined"} onClick={(event) => setRepeatOnWeekday(event, 3)}>TUE</Button>
                    <Button variant={clickedEvent?.repeatOnWeekday === 4 ? "contained" : "outlined"} onClick={(event) => setRepeatOnWeekday(event, 4)}>WED</Button>
                    <Button variant={clickedEvent?.repeatOnWeekday === 5 ? "contained" : "outlined"} onClick={(event) => setRepeatOnWeekday(event, 5)}>THU</Button>
                    <Button variant={clickedEvent?.repeatOnWeekday === 6 ? "contained" : "outlined"} onClick={(event) => setRepeatOnWeekday(event, 6)}>FRI</Button>
                    <Button variant={clickedEvent?.repeatOnWeekday === 7 ? "contained" : "outlined"} onClick={(event) => setRepeatOnWeekday(event, 7)}>SAT</Button>
                  </ButtonGroup>
                </FormGrid>
                <FormGrid size={12} >
                  <FormControl sx={{ m: 3 }} error={error} variant="standard">
                    <FormLabel id="repeat-end">End repeat</FormLabel>
                    <RadioGroup
                      name="repeatEnd"
                      value={clickedEvent?.repeatEnd ?? "never"}
                      onChange={handleInput}
                    >
                      <FormControlLabel value="never" control={<Radio />} label="Never" />
                      <FormControlLabel value="on" control={<Radio />}
                        label={<Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
                          <Typography>on</Typography>
                          <NumberField id="repeatEndOn" name="repeatEndOn" size="small" min={1} max={999}
                            disabled={clickedEvent?.repeatEnd != "on"}
                            width="125px"
                            value={clickedEvent?.repeatEndOn ?? 1}
                            onValueChange={(value, event) => handleInputChangeNumeric(value, event, "repeatEndOn")}
                          />
                          <Typography color="text.secondary"> occurences(s)</Typography>
                        </Box>
                        }
                      />
                      <FormControlLabel value="after" control={<Radio />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: "center", width: '100%', gap: 2 }}>
                            <Typography>After</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateTimePicker
                                name="repeatEndAfter"
                                sx={{ top: 30 }}
                                // Forces the clock selection UI to 24-hour format
                                ampm={false}
                                disabled={clickedEvent?.repeatEnd != "after"}
                                format="DD MMMM YYYY HH:mm"
                                //onError={(newError) => setErrorDate(newError)}
                                slotProps={{
                                  actionBar: {
                                    actions: ["cancel", "clear", "today", "accept"]
                                  },
                                  textField: {
                                    helperText: "Time must be in 24 hour format if manually entered",
                                    size: "small",
                                    required: true,
                                  },
                                  openPickerButton: {
                                    size: "small",
                                    sx: { mr: "-13px" }
                                  },
                                }}
                                ////minDate={startOfQ11990}
                                ////maxDate={endOfQ11990}
                                value={dayjs(`${clickedEvent?.repeatEndAfter}`)}
                                onChange={handleRepeatEndAfterChange}
                              />
                            </LocalizationProvider>
                          </Box>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </FormGrid>
              </Grid2>
            </FormGrid>
          </Grid2>
        </form>
      </Drawer >
      {/* Event delete confirmation dialog */}
      < ConfirmationDialog
        open={openDeleteDialog}
        confirmDelete={confirmDelete}
        cancelDelete={cancelDelete}
        setOpen={setOpenDeleteDialog}
        message="Are you sure you want to delete this event? This action cannot be undone."
      />
      <SnackbarCustomized
        openToast={openToast}
        setOpenToast={setOpenToast}
        message={error ? toastMessage + " " + error.message : (toastMessage ? toastMessage : "The operation was successfull!")}
        severity={error ? "error" : "success"} />
    </Paper >
  )
}
