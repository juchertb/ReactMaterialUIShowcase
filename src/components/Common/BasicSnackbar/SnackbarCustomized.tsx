import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import React from "react";

const SnackbarCustomized = (props: any) => {
  const hasError: boolean = (props.message.toLowerCase().substr("error") > 0);

  const handleCloseToast = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    props.setOpenToast(false);
  };

  return (
    <Snackbar open={props.openToast} autoHideDuration={6000} onClose={handleCloseToast}>
      <Alert
        onClose={handleCloseToast}
        severity={props.severity}
        variant="filled"
        sx={{ width: '100%', whiteSpace: 'pre-line' }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarCustomized;
