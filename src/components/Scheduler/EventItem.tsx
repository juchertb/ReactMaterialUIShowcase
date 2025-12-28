import { Chip } from "@mui/material";
import React from "react";
import { Tooltip } from '@mui/material'
import type { SchedulerEvent } from "../../Utils/Types";
import { SchedulerEventCategoryIconEnum } from "../../Utils/Types";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

/*
  I wasn't able to pass the click event handler. It
  complains that it is not defined in ev.
*/
const EventItem = ({ ev, onTaskClick }: { ev: SchedulerEvent; onTaskClick?: (e: SchedulerEvent) => void }) => {
  return (
    <>
      <Tooltip key={ev.id} title={`${ev.title} (${ev.startHour || 'All day'})`} placement="right">
        <Chip
          variant="outlined"
          icon={(() => {
            switch (ev.category.icon) {
              case SchedulerEventCategoryIconEnum.Code:
                return <LaptopMacIcon sx={{ color: `${ev.category.chipColor} !important` }} />;
              case SchedulerEventCategoryIconEnum.Eat:
                return <FastfoodIcon sx={{ color: `${ev.category.chipColor} !important` }} />;
              case SchedulerEventCategoryIconEnum.Sleep:
                return <HotelIcon sx={{ color: `${ev.category.chipColor} !important` }} />;
              case SchedulerEventCategoryIconEnum.Repeat:
                return <RepeatIcon sx={{ color: `${ev.category.chipColor} !important` }} />;
              case SchedulerEventCategoryIconEnum.Meet:
                return <GroupsIcon sx={{ color: `${ev.category.chipColor} !important` }} />;
              case SchedulerEventCategoryIconEnum.Call:
                return <LocalPhoneIcon sx={{ color: `${ev.category.chipColor} !important` }} />;
              case SchedulerEventCategoryIconEnum.Review:
                return <RateReviewIcon sx={{ color: `${ev.category.chipColor} !important` }} />;
              case SchedulerEventCategoryIconEnum.Onboarding:
                return <PersonAddIcon sx={{ color: `${ev.category.chipColor} !important` }} />;
              default:
                return null;
            }
          }
          )()}
          key={ev.id}
          label={ev.title}
          size="medium"
          onClick={() => onTaskClick?.(ev)}
          sx={{ borderColor: `${ev.category.chipColor} !important`, justifyContent: 'left' }} />
      </Tooltip>
    </>
  )
};

export default EventItem;
