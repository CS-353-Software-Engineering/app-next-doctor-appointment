import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import { PageMode } from "../../../../../constants/helpers";

export default function PatientForm(props: any) {

  const {
    setPageMode
  } = props

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Salam Patient Sahab
      </Typography>

      <TextField
        label="First name"
        variant="outlined"
        margin="normal"
        fullWidth
      />

      <TextField
        label="Last name"
        variant="outlined"
        margin="normal"
        fullWidth
      />

      <br /><br />

      <Button onClick={() => {
        setPageMode(PageMode.ROLE_PICKER_PAGE);
      }} type="submit" fullWidth variant="contained" color="primary">
        Go Back
      </Button>


    </>
  );
}
