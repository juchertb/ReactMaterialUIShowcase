import React from 'react'
import { Grid2, Paper, Typography, Box, useColorScheme } from '@mui/material'
import { format, startOfMonth, getDaysInMonth, startOfWeek, add } from 'date-fns'
import { SchedulerEventCategoryIconEnum, type SchedulerEvent } from "../../Utils/Types";
import EventItem from './EventItem';

type Props = {
  date: Date
  events: SchedulerEvent[]
  onTaskClick?: (e: SchedulerEvent) => void
}

function buildMonth(date: Date, events: SchedulerEvent[]) {
  const start = startOfMonth(date)
  const days = getDaysInMonth(date)
  const weeks: { date: Date; day: number; events: SchedulerEvent[] }[][] = []
  let current = startOfWeek(start, { weekStartsOn: 1 })
  while (current <= add(start, { days: days + 7 })) {
    const week = []
    for (let i = 0; i < 7; i++) {
      const d = add(current, { days: i })
      const dayEvents = events.filter(ev => isSameDayString(ev.date, d))
      week.push({ date: d, day: parseInt(format(d, 'd')), events: dayEvents })
    }
    weeks.push(week)
    current = add(current, { days: 7 })
    if (weeks.length > 6) break
  }
  return weeks
}

function isSameDayString(s: string, d: Date) {
  const parts = s.split('-').map(Number)
  return parts[0] === d.getFullYear() && parts[1] === d.getMonth() + 1 && parts[2] === d.getDate()
}

export default function MonthModeView({ date, events, onTaskClick }: Props) {
  const { mode, setMode } = useColorScheme();
  const weeks = buildMonth(date, events)
  const weekNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return (
    <Box>
      <Grid2 container spacing={0} sx={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        {weekNames.map((w) => (
          <Grid2 size={{ xs: 12 / 7 }} key={w} sx={{ p: 1 }}>
            <Typography variant="subtitle2" align="center">{w}</Typography>
          </Grid2>
        ))}
      </Grid2>
      {weeks.map((week, idx) => (
        <Grid2 container key={idx} spacing={0}>
          {week.map((cell) => (
            <Grid2 size={{ xs: 12 / 7 }} key={cell.day} sx={{ border: `1px solid rgba(0,0,0,${mode === 'dark' ? '0.43' : '0.03'})`, minHeight: 80, p: 1 }}>
              <Typography variant="caption">{cell.day}</Typography>
              <Box sx={{ mt: 0.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {cell.events.map(ev => (
                  <EventItem key={ev.id} ev={ev} onTaskClick={onTaskClick} />
                ))}
              </Box>
            </Grid2>
          ))}
        </Grid2>
      ))}
    </Box>
  )
}
