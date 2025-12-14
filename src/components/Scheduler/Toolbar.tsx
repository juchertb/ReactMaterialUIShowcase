import React from 'react'
import { Box, IconButton, Typography, Select, MenuItem, Button } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

type Props = {
  dateLabel: string
  mode: string
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  onModeChange: (m: string) => void
}

export default function SchedulerToolbar({ dateLabel, mode, onPrev, onNext, onToday, onModeChange }: Props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, marginBottom: "15px" }}>
      <IconButton onClick={onPrev} size="small"><ChevronLeftIcon /></IconButton>
      <IconButton onClick={onToday} size="small" sx={{ fontSize: "0.75rem", width: "50px" }}>Today</IconButton>
      <IconButton onClick={onNext} size="small"><ChevronRightIcon /></IconButton>
      <Typography sx={{ ml: 1, flex: 1 }}>{dateLabel}</Typography>
      <Select value={mode} onChange={(e) => onModeChange(String(e.target.value))} size="small">
        <MenuItem value="month">Month</MenuItem>
        <MenuItem value="week">Week</MenuItem>
        <MenuItem value="day">Day</MenuItem>
        <MenuItem value="timeline">Timeline</MenuItem>
      </Select>
    </Box>
  )
}
