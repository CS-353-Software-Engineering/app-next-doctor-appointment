import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState, useContext } from "react";
import { PageMode } from "../../../../../constants/helpers";
import { PatientFormInput } from "../../../../../constants/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import DB from "../../../../../services/data";
import { Spinner } from "react-bootstrap";
import AuthContext from "../../../../../contexts/shared/auth/authContext";

const schema = yup.object().shape({
  fName: yup.string().required("First Name is required"),
  lName: yup.string().required("Last Name is required"),
  number: yup.string().required("Phone number is required").matches(/^[0-9]*$/, "Please enter a valid phone number"),
});

export default function PatientForm(props: any) {

  const {
    setPageMode,
    userData
  } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormInput>({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const { signup } = useContext(AuthContext);


  const onSubmit = (patientData: PatientFormInput) => {
    setLoading(true);

    signup({ username: userData.email, password: userData.password }).then(
      () => {
        DB.createPatient(userData, patientData).then(() => {
          console.log("Account created successfully!");
        }).catch((error) => {
          console.log(error);
          setLoading(false);
        }).finally(() => {
          setPageMode(PageMode.VERIFY_USER_PAGE);
        });
      }
    ).catch((error) => {
      console.log(error);
    })

  };

  return (
    <>

      {loading &&
        <div style={{ textAlign: 'center' }}>
          <Spinner animation="border">
          </Spinner>
        </div>
      }

      {!loading &&
        <>
          <Typography variant="h6" gutterBottom>
            Salam Patient Sahab
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">

            <TextField
              {...register("fName")}
              label="First name"
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <Typography variant="inherit" className="text-danger ">
              {errors.fName?.message}
            </Typography>

            <TextField
              {...register("lName")}
              label="Last name"
              variant="outlined"
              margin="normal"
              fullWidth
            />

            <Typography variant="inherit" className="text-danger ">
              {errors.lName?.message}
            </Typography>


            <TextField
              {...register("number")}
              label="Number"
              variant="outlined"
              margin="normal"
              fullWidth
            />

            <Typography variant="inherit" className="text-danger ">
              {errors.number?.message}
            </Typography>


            <br />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Submit
            </Button>

          </form>

          <br /><br />

          <Button onClick={() => {
            setPageMode(PageMode.ROLE_PICKER_PAGE);
          }} fullWidth variant="contained" color="primary">
            Go Back
          </Button>


        </>

      }

    </>
  );
}
