import React from 'react'
import { Box, Typography, Grid2, useColorScheme, } from '@mui/material'
import { startOfWeek, add, format, parse } from 'date-fns'
import { type SchedulerEvent } from "../../Utils/Types";
import EventItem from './EventItem';

type Props = {
  date: Date
  events: SchedulerEvent[]
  onTaskClick?: (e: SchedulerEvent) => void
}

function isSameDayString(s: string, d: Date) {
  const parts = s.split('-').map(Number)
  return parts[0] === d.getFullYear() && parts[1] === d.getMonth() + 1 && parts[2] === d.getDate()
}

export default function WeekModeView({ date, events, onTaskClick }: Props) {
  const { mode, setMode } = useColorScheme();
  const start = startOfWeek(date, { weekStartsOn: 1 })
  const days = Array.from({ length: 7 }).map((_, i) => add(start, { days: i }))
  const hours = Array.from({ length: 24 }).map((_, i) => i)

  return (
    <Box>
      <Grid2 container>
        <Grid2 size={{ xs: 2 }}><Typography variant="caption">Time</Typography></Grid2>
        {days.map((d) => (
          <Grid2 size={{ xs: 1 }} key={d.toString()}>
            <Typography variant="subtitle2">{format(d, 'EEE d')}</Typography>
          </Grid2>
        ))}
      </Grid2>
      {hours.map((h) => (
        <Grid2 container key={h} sx={{ borderTop: `1px solid rgba(0,0,0,${mode === 'dark' ? '0.93' : '0.03'})`, minHeight: 36 }}>
          <Grid2 size={{ xs: 2 }}><Typography variant="caption">{String(h).padStart(2, '0')}:00</Typography></Grid2>
          {days.map((d) => (
            <Grid2 size={{ xs: 1 }} key={d.toString() + h} sx={{ p: 0.5 }}>
              {events.filter(ev => isSameDayString(ev.date, d) && ev.startHour && parse(ev.startHour, 'HH:mm', new Date()).getHours() === h)
                .map(ev =>
                  <EventItem key={ev.id} ev={ev} onTaskClick={onTaskClick} />
                )
              }
            </Grid2>
          ))}
        </Grid2>
      ))}
    </Box>
  )
}
