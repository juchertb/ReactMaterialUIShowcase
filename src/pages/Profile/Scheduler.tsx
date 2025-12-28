import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { Scheduler } from '../../components/Scheduler'
import mockEvents from '../../components/Scheduler/mockEvents'
import useAuthentication from '../../hooks/useAuthentication';
import GridWrapper from '../../components/Common/GridWrapper';
import SignIn from '../../components/SignIn/SignIn';

export default function SchedulerPage() {
  const { isAuthenticated } = useAuthentication();
  return (
    <>
      <GridWrapper>
        {isAuthenticated === true ? (
          <Scheduler />
        ) : (
          <SignIn />
        )}
      </GridWrapper>
    </>
  )
}
