import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface RolePickerProps {
  selectedRole: UserRole;
}

export default function RolePicker(props: RolePickerProps) {
  const [userRole, setUserRole] = useState();

  return (
    <>
      <Typography variant="h5" align="center">
        Account created successfully!
      </Typography>

      <br />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Are you a doctor or a patient?
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={userRole}
          label="Are you a doctor or a patient?"
          onChange={() => {}}
        >
          <MenuItem value={UserRole.DOCTOR}>I am a Doctor</MenuItem>
          <MenuItem value={UserRole.PATIENT}>I am a Patient</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" fullWidth variant="contained" color="primary">
        Continue
      </Button>

      <br />
      <br />
      <br />
      {/*<Button fullWidth variant="contained" color="primary">*/}
      {/*  Go back*/}
      {/*</Button>*/}
    </>
  );
}

enum UserRole {
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
}
