import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";

export default function VerifyAccountForm() {
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <Typography textAlign="center" variant="h5">
        Enter Verification Code
      </Typography>

      <TextField
        name="verificationCode"
        label="Verification Code"
        variant="outlined"
        fullWidth
        margin="normal"
      />

      <Button type="submit" fullWidth variant="contained" color="primary">
        Verify
      </Button>

      <br />
      <br />
      <br />

      <Button type="submit" fullWidth variant="contained" color="primary">
        Go back
      </Button>
    </form>
  );
}
