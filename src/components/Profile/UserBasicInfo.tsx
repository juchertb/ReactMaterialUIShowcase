import { Box, Button, Chip, FormLabel, Grid2, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, styled, Typography } from "@mui/material";
import React, { InvalidEvent, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from "dayjs";
import { DateTimeValidationError } from "@mui/x-date-pickers/models";
import { Theme, useTheme } from "@mui/material/styles";
import SaveIcon from '@mui/icons-material/Save';


const FormGrid = styled(Grid2)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

enum Gender {
    None = 0,
    Male = 1,
    Female = 2
};

enum Language {
    None = 0,
    English = 1,
    French = 2
};

interface ChipData {
    key: number;
    label: string;
};

type PersonInfo = {
    firstname: string;
    lastname: string;
    gender: Gender;
    birthDate: Date;
    email: string;
    location?: string;
    phone: string;
    language: Language;
    tags?: ChipData[];
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, chipName: readonly string[], theme: Theme) {
    return {
        fontWeight: chipName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

const allChips: string[] = [
    "Angular",
    "jQuery",
    "Polymer",
    "React",
    "Vue.js",
    "Next.js",
    "Vite"
];

const ChipListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const UserBasicInfo = (props) => {
    const theme = useTheme();
    const [personInfo, setPersonInfo] = useState({
        firstname: "Paul",
        lastname: "Alen",
        gender: Gender.None,
        birthDate: new Date(1990, 4, 7),
        email: "someemail@someserver.ca",
        location: "Montréal, Canada",
        phone: "819-555-8888",
        language: Language.English,
        tags: ["angular", "React", "Next"]
    });

    const startOfQ11990 = dayjs('1990-01-01T00:00:00.000');
    const endOfQ11990 = dayjs('1990-03-31T23:59:59.999');

    const [error, setError] = React.useState<DateTimeValidationError | null>(null);

    const errorMessage = React.useMemo(() => {
        switch (error) {
            case 'maxDate':
            case 'minDate': {
                return 'Please select a date in the first quarter of 1990';
            }

            case 'invalidDate': {
                return 'Your date is not valid';
            }

            default: {
                return '';
            }
        }
    }, [error]);

    const handleGenderChange = (event: SelectChangeEvent) => {
        setPersonInfo({ ...personInfo, gender: (event.target.value as unknown) as Gender });
    }

    const handleLanguageChange = (event: SelectChangeEvent) => {
        setPersonInfo({ ...personInfo, language: (event.target.value as unknown) as Language });
    }

    const handleChipChange = (event: SelectChangeEvent<typeof personInfo.tags>) => {
        const {
            target: { value },
        } = event;
        setPersonInfo({
            ...personInfo, tags: typeof value === 'string' ? value.split(',') : value
        });
    };

    const handleSubmit = evt => {
        evt.preventDefault();

        let data = { personInfo };

        console.log(data);
        return;

        fetch("https://pointy-gauge.glitch.me/api/form", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => console.log("Success:", JSON.stringify(response)))
            .catch(error => console.error("Error:", error));
    };

    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setPersonInfo({ ...personInfo, [name]: newValue });
    };

    const handleInvalidPhone = (event: InvalidEvent<HTMLInputElement>) => {
        event.target.setCustomValidity("The phone number must be of format 111-222-3333");
    }

    //const handleInvalidBirthdate = (event: InvalidEvent<HTMLInputElement>) => {
    //event.target.setCustomValidity("The phone number must be of format +1 111-222-3333");
    //}

    return (
        <Paper elevation={3} sx={{
            borderRadius: "0.75rem",
            width: "100%",
            height: "100%",
            padding: "15px"
        }}>
            <p id="basic-info" />
            <Typography variant="h6">Basic Info</Typography>
            <form onSubmit={handleSubmit}>
                <Grid2 container spacing={3}>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="firstname" required>
                            First name
                        </FormLabel>
                        <OutlinedInput
                            id="firstname"
                            name="firstname"
                            type="name"
                            placeholder="Your firstname"
                            autoComplete="first name"
                            required
                            size="small"
                            value={personInfo.firstname}
                            onChange={handleInput}
                        />
                    </FormGrid>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="lastname" required>
                            Last name
                        </FormLabel>
                        <OutlinedInput
                            id="lastname"
                            name="lastname"
                            type="name"
                            placeholder="Your lastname"
                            autoComplete="last name"
                            required
                            size="small"
                            value={personInfo.lastname}
                            onChange={handleInput}
                        />
                    </FormGrid>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="gender-label" required>
                            Gender
                        </FormLabel>
                        <Select
                            labelId="gender-label"
                            id="gender"
                            name="gender"
                            value={personInfo.gender.toString()}
                            label="Gender"
                            onChange={handleGenderChange}
                            size="small"
                        >
                            <MenuItem value={Gender.None.toString()}>Not specified</MenuItem>
                            <MenuItem value={Gender.Male.toString()}>Male</MenuItem>
                            <MenuItem value={Gender.Female.toString()}>Female</MenuItem>
                        </Select>
                    </FormGrid>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="bith-date" required>
                            Birth Date
                        </FormLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                name="bith-date"
                                format="DD MMMM YYYY"
                                onError={(newError) => setError(newError)}
                                slotProps={{
                                    textField: {
                                        helperText: errorMessage,
                                        size: "small",
                                        required: true,
                                    },
                                    openPickerButton: {
                                        size: "small",
                                    },
                                }}
                                minDate={startOfQ11990}
                                maxDate={endOfQ11990}
                                views={["year", "month", "day"]}
                                value={dayjs(personInfo.birthDate)}
                                onChange={(newValue) => personInfo.birthDate = newValue.toDate()}
                            //onInvalid={handleInvalidBirthdate}
                            />
                        </LocalizationProvider>
                    </FormGrid>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="email" required>
                            Email
                        </FormLabel>
                        <OutlinedInput
                            id="email"
                            name="email"
                            type="email"
                            placeholder="example@email.com"
                            //autoComplete="first name"
                            required
                            size="small"
                            value={personInfo.email}
                            onChange={handleInput}
                        />
                    </FormGrid>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="confirmation-email" required>
                            Confirmation Email
                        </FormLabel>
                        <OutlinedInput
                            id="confirmation-email"
                            name="confirmation-email"
                            type="email"
                            placeholder="example@email.com"
                            //autoComplete="last name"
                            required
                            size="small"
                        />
                    </FormGrid>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="location" required>
                            Location
                        </FormLabel>
                        <OutlinedInput
                            id="location"
                            name="location"
                            type="text"
                            placeholder="Example: Montréal, Canada"
                            //autoComplete="first name"
                            required
                            size="small"
                            value={personInfo.location}
                            onChange={handleInput}
                        />
                    </FormGrid>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="phone" required>
                            Phone Number
                        </FormLabel>
                        <OutlinedInput
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="735-631-6203"
                            inputProps={{
                                pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
                            }}
                            required
                            size="small"
                            value={personInfo.phone}
                            onChange={handleInput}
                            onInvalid={handleInvalidPhone}
                        />
                    </FormGrid>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="language" required>
                            Language
                        </FormLabel>
                        <Select
                            id="language"
                            name="language"
                            value={personInfo.language.toString()}
                            label="Language"
                            onChange={handleLanguageChange}
                            size="small"
                        >
                            <MenuItem value={Language.None.toString()}>Not specified</MenuItem>
                            <MenuItem value={Language.English.toString()}>English</MenuItem>
                            <MenuItem value={Language.French.toString()}>French</MenuItem>
                        </Select>
                    </FormGrid>
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="language">
                            Skills
                        </FormLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            size="small"
                            value={personInfo.tags}
                            onChange={handleChipChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {allChips.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, personInfo.tags, theme)}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormGrid>
                    <FormGrid size={12} sx={{ alignItems: "end" }}>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                            size="small"
                        >
                            Save <SaveIcon sx={{ marginLeft: "5px" }} />
                        </Button>
                    </FormGrid>
                </Grid2>
            </form>
        </Paper >
    )
};

export default UserBasicInfo;
