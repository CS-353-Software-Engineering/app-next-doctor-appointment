import { Button, InputBase, styled, Typography, FormControl, MenuItem, Select, NativeSelect, InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState, useContext } from "react";
import { Department, PageMode } from "../../../../../constants/helpers";
import { DoctorFormInput } from "../../../../../constants/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Spinner } from "react-bootstrap";
import AuthContext from "../../../../../contexts/shared/auth/authContext";
import { useRouter } from "next/router";




const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));



const schema = yup.object().shape({
  fName: yup.string().required("First Name is required"),
  lName: yup.string().required("Last Name is required"),
  number: yup.string().required("Phone number is required").matches(/^[0-9]*$/, "Please enter a valid phone number"),
  bio: yup.string().required("Bio is required"),
});

export default function DoctorForm(props: any) {

  const [department, setDepartment] = React.useState('');
  const handleChange = (event: { target: { value: string } }) => {
    setDepartment(event.target.value);
  };

  const {
    setPageMode,
    userData,
    departmentsList,
  } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DoctorFormInput>({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const { createDoctor } = useContext(AuthContext);

  const router = useRouter()
  const redirect = () => {
    router.replace("/patient")
  }

  const onSubmit = (doctorData: DoctorFormInput) => {
    setLoading(true);

    let doctorDataFields = { ...userData, ...doctorData };
    doctorDataFields['doctorDepartmentId'] = department;

    createDoctor(doctorDataFields)
      .then(() => {
        console.log("Account created successfully!");
        redirect();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
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
            Salam Doctor Sahab
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


            <TextField
              {...register("bio")}
              label="Bio"
              variant="outlined"
              margin="normal"
              fullWidth
            />

            <Typography variant="inherit" className="text-danger ">
              {errors.bio?.message}
            </Typography>

            <FormControl
              sx={{ width: 400 }} variant="standard">

              <InputLabel htmlFor="demo-customized-select-native">Department</InputLabel>
              <NativeSelect
                id="demo-customized-select-native"
                value={department}
                onChange={handleChange}
                input={<BootstrapInput />}
              >
                <option value="None" >{null}</option>
                {departmentsList?.map((department: Department) => {
                  return (<option key={department?.id} value={department?.id}> {department?.name}</option>);
                }
                )}
              </NativeSelect>
            </FormControl>


            <br />
            <br />
            <Button disabled={loading} type="submit" fullWidth variant="contained" color="primary">
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
