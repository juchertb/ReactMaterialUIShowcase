import React from 'react'
import { Scheduler } from '../../components/Scheduler'
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
