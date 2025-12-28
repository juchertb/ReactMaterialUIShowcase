import React from 'react'
import { Box, List, ListItem, ListItemText, Chip, Typography } from '@mui/material';
import type { SchedulerEvent } from "../../Utils/Types";
import { SchedulerEventCategoryIconEnum } from "../../Utils/Types";
import { Timeline, TimelineItem, TimelineConnector, TimelineOppositeContent, TimelineSeparator, TimelineDot, TimelineContent } from '@mui/lab';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

type Props = {
  date: Date
  events: SchedulerEvent[]
  onTaskClick?: (e: SchedulerEvent) => void
}

export default function TimeLineModeView({ date, events, onTaskClick }: Props) {
  function getStartDateTime(ev: SchedulerEvent) {
    return `${new Date(ev.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })} ${ev.startHour}`;
  }

  return (
    <Box>
      <Timeline position="alternate">
        {events.sort((a, b) => new Date(a.date + ' ' + a.startHour).getTime() - new Date(b.date + ' ' + b.startHour).getTime()).map(ev => (
          <TimelineItem key={ev.id}>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              {getStartDateTime(ev)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot onClick={() => onTaskClick?.(ev)}
                sx={{ color: { backgroundColor: ev.category.chipColor } }}
              >
                {ev.category.icon === SchedulerEventCategoryIconEnum.Code && <LaptopMacIcon />}
                {ev.category.icon === SchedulerEventCategoryIconEnum.Eat && <FastfoodIcon />}
                {ev.category.icon === SchedulerEventCategoryIconEnum.Sleep && <HotelIcon />}
                {ev.category.icon === SchedulerEventCategoryIconEnum.Repeat && <RepeatIcon />}
                {ev.category.icon === SchedulerEventCategoryIconEnum.Meet && <GroupsIcon />}
                {ev.category.icon === SchedulerEventCategoryIconEnum.Call && <LocalPhoneIcon />}
                {ev.category.icon === SchedulerEventCategoryIconEnum.Review && <RateReviewIcon />}
                {ev.category.icon === SchedulerEventCategoryIconEnum.Onboarding && <PersonAddIcon />}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                {ev.category.label}
              </Typography>
              <Typography>{ev.title}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  )
}
