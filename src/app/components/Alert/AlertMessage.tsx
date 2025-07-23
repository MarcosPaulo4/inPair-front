"use client"

import { Alert, Snackbar } from "@mui/material";
import { useAlert } from "./useAlertProvider";

const AlertMessage = () => {
  const { alert, clearAlert } = useAlert()


  return (
    <Snackbar
      open={!!alert}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      onClose={clearAlert}
    >
      <Alert onClose={clearAlert} severity={alert?.type}>
        {alert?.message}
      </Alert>

    </Snackbar>
  )
}

export default AlertMessage;