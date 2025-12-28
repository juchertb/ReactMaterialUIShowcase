import React, { MouseEventHandler } from 'react'
import { Box, IconButton, Typography, Select, MenuItem, Button, Tooltip } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

type Props = {
  dateLabel: string
  mode: string
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  onModeChange: (m: string) => void
  onAddClick: (e: React.KeyboardEvent | React.MouseEvent) => void
}

export default function SchedulerToolbar({ dateLabel, mode, onPrev, onNext, onToday, onModeChange, onAddClick }: Props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, marginBottom: "15px" }}>
      <Tooltip
        title="Previous" >
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={onPrev}
        >
          <ChevronLeftIcon />
        </Button>
      </Tooltip>
      <Tooltip
        title="Select today" >
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={onToday}
          sx={{ fontSize: "0.75rem", width: "50px" }}
        >
          Today
        </Button>
      </Tooltip>
      <Tooltip
        title="Next" >
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={onNext}
        >
          <ChevronRightIcon />
        </Button>
      </Tooltip>
      <Typography sx={{ ml: 1, flex: 1, fontWeight: "bold" }}>{dateLabel}</Typography>
      <Tooltip
        title="Add a new event to the calendar" >
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={onAddClick}
          startIcon={<CalendarMonthIcon />}
        >
          Add
        </Button>
      </Tooltip>
      <Select value={mode} variant="outlined" sx={{ fontWeight: "bold" }} onChange={(e) => onModeChange(String(e.target.value))} size="small">
        <MenuItem value="month">Month</MenuItem>
        <MenuItem value="week">Week</MenuItem>
        <MenuItem value="day">Day</MenuItem>
        <MenuItem value="timeline">Timeline</MenuItem>
      </Select>
    </Box >
  )
}
