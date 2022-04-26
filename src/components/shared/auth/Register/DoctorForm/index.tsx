import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";

export default function DoctorForm() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Doctor Details
      </Typography>

      <TextField
        label="First name"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Typography variant="inherit" className="text-danger  ">
        {/*{errors.fname?.message}*/}
      </Typography>

      <TextField
        label="Last name"
        variant="outlined"
        margin="normal"
        fullWidth
      />

      <Typography variant="inherit" className="text-danger ">
        {/*{errors.lname?.message}*/}
      </Typography>

      <TextField
        name="attribute1"
        label="Attribute 1"
        variant="outlined"
        fullWidth
        margin="normal"
      />

      <TextField
        name="attribute2"
        label="Attribute 2"
        variant="outlined"
        fullWidth
        margin="normal"
      />
    </>
  );
}
