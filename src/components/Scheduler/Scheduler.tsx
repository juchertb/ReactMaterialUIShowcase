import React, { useMemo, useState } from 'react'
import { Paper } from '@mui/material'
import { format, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from 'date-fns'
import DateFnsLocaleContext from './DateFnsLocaleContext'
import { enUS } from 'date-fns/locale/en-US'
import SchedulerToolbar from './Toolbar'
import MonthModeView from './MonthModeView'
import WeekModeView from './WeekModeView'
import DayModeView from './DayModeView'
import TimeLineModeView from './TimeLineModeView'
import type { SchedulerEvent } from './mockEvents'

type Props = {
  events?: SchedulerEvent[]
  defaultMode?: 'month' | 'week' | 'day' | 'timeline'
  locale?: string
}

export default function Scheduler({ events = [], defaultMode = 'month', locale = 'en' }: Props) {
  const [mode, setMode] = useState<string>(defaultMode)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

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

  return (
    <Paper elevation={3} sx={{ borderRadius: "0.75rem", width: "100%", height: "100%", padding: "15px" }}>
      <DateFnsLocaleContext.Provider value={enUS}>
        <SchedulerToolbar dateLabel={dateLabel} mode={mode} onPrev={onPrev} onNext={onNext} onToday={onToday} onModeChange={setMode} />
        {mode === 'month' && <MonthModeView date={selectedDate} events={events} />}
        {mode === 'week' && <WeekModeView date={selectedDate} events={events} />}
        {mode === 'day' && <DayModeView date={selectedDate} events={events} />}
        {mode === 'timeline' && <TimeLineModeView date={selectedDate} events={events} />}
      </DateFnsLocaleContext.Provider>
    </Paper>
  )
}
