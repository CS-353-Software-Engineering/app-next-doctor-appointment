import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

import { UserRole } from "../../../../../../src/constants/policies/access.control.policy"
import { PageMode } from "../../../../../constants/helpers";


export default function RolePicker(props: any) {

  const {
    setPageMode,
    setUserRole,
    userRole
  } = props



  const handleChange = (event: SelectChangeEvent) => {
    setUserRole(event.target.value as UserRole);
  };

  return (
    <>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Are you a doctor or a patient?
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={userRole}
          label="Are you a doctor or a patient?"
          onChange={handleChange}
        >
          <MenuItem value={UserRole.DOCTOR}>I am a Doctor</MenuItem>
          <MenuItem value={UserRole.PATIENT}>I am a Patient</MenuItem>
        </Select>
      </FormControl>
      <br /><br />
      <Button onClick={() => {
        if (userRole == UserRole.PATIENT) setPageMode(PageMode.PATIENT_DETAIL_PAGE);
        if (userRole == UserRole.DOCTOR) setPageMode(PageMode.DOCTOR_DETAILS_PAGE);
      }} type="submit" fullWidth variant="contained" color="primary">
        Continue
      </Button>

      <br /><br />

      <Button onClick={() => {
        setPageMode(PageMode.REGISTER_USER_PAGE);
      }} type="submit" fullWidth variant="contained" color="primary">
        Go Back
      </Button>

    </>
  );
}

