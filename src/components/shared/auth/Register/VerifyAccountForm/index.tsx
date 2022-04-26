import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useContext, useState } from "react";
import { PageMode } from "../../../../../constants/helpers";
import AuthContext from "../../../../../contexts/shared/auth/authContext";

export default function VerifyAccountForm(props: any) {

  const {
    setPageMode,
    userData
  } = props

  const [code, setCode] = useState("");

  const { login, verify } = useContext(AuthContext);

  const VerifyUser = () => {
    const { email, password } = userData;

    console.log(userData);

    verify({ username: email, password: password }, code).then(() => {
      login({ username: email, password: password })
        .then(() => {
          alert("Logged in");
        })
        .catch((error: any) => {
          console.error(error);
          alert("Incorrect username/password");
        })
        .finally(() => {

        });
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      <Typography textAlign="center" variant="h5">
        Enter Verification Code
      </Typography>

      <TextField
        name="verificationCode"
        label="Verification Code"
        variant="outlined"
        fullWidth
        margin="normal"
        value={code}
        onChange={(e: any) => setCode(e.target.value)}
      />

      <Button onClick={VerifyUser} type="submit" fullWidth variant="contained" color="primary">
        Verify
      </Button>

      <br />
      <br />
      <br />

      <Button onClick={() => {
        setPageMode(PageMode.ROLE_PICKER_PAGE)
      }} type="submit" fullWidth variant="contained" color="primary">
        Go back
      </Button>
    </>
  );
}
