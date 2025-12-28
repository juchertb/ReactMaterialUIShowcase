import React from 'react'
import { Box, Grid2, Typography, useColorScheme } from '@mui/material'
import { parse } from 'date-fns'
import type { SchedulerEvent } from "../../Utils/Types";
import EventItem from './EventItem'

type Props = {
  date: Date
  events: SchedulerEvent[]
  onTaskClick?: (e: SchedulerEvent) => void
}

function isSameDayString(s: string, d: Date) {
  const parts = s.split('-').map(Number)
  return parts[0] === d.getFullYear() && parts[1] === d.getMonth() + 1 && parts[2] === d.getDate()
}

export default function DayModeView({ date, events, onTaskClick }: Props) {
  const { mode, setMode } = useColorScheme();
  const hours = Array.from({ length: 24 }).map((_, i) => i)
  return (
    <Box>
      {hours.map(h => (
        <Grid2 container key={h} sx={{ borderTop: `1px solid rgba(0,0,0,${mode === 'dark' ? '0.93' : '0.03'})`, minHeight: 40 }}>
          <Grid2 size={{ xs: 2 }}><Typography variant="caption">{String(h).padStart(2, '0')}:00</Typography></Grid2>
          <Grid2>
            {events.filter(ev => isSameDayString(ev.date, date) && ev.startHour && parse(ev.startHour, 'HH:mm', new Date()).getHours() === h)
              .map(ev =>
                <EventItem key={ev.id} ev={ev} onTaskClick={onTaskClick} />
              )
            }
          </Grid2>
        </Grid2>
      ))}
    </Box>
  )
}
