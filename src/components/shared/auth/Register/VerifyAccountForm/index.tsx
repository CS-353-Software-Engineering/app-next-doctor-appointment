import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useContext, useState } from "react";
import { PageMode, UserFormInput } from "../../../../../constants/helpers";
import AuthContext from "../../../../../contexts/shared/auth/authContext";

interface VerifyAccountFormProps {
  setPageMode: (mode: PageMode) => void;
  userData: UserFormInput,
  setID: (id: string) => void
}

export default function VerifyAccountForm(props: VerifyAccountFormProps) {

  const {
    setPageMode,
    userData,
    setID
  } = props

  const [code, setCode] = useState("");

  const { login, verify } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);



  const verifyUser = async () => {
    const { email, password } = userData;
    await verify({ username: email, password }, code);
    const cognitoUser = await login({ username: email, password: password })

    const userID = cognitoUser?.attributes?.sub ?? "123"
    console.log(userID)
    setID(userID)
  }

  const onSubmit = () => {

    setLoading(true);

    verifyUser().then(() => {
      setPageMode(PageMode.ROLE_PICKER_PAGE)

    }).catch(error => {
      console.log(error)
    })
      .finally(() => { setLoading(false); })
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

      <Button disabled={loading} onClick={onSubmit} fullWidth variant="contained" color="primary">
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
