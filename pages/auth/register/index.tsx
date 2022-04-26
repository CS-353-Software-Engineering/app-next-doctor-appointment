import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, InputLabel, MenuItem, Select, SelectChangeEvent, FormControl, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useCallback, useState } from "react";
import { LayoutProvider } from "../../../src/providers/LayoutProvider";
import { useRouter } from "next/router";


interface IFormInput {
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  fname: yup.string().required("First Name is required"),
  lname: yup.string().required("Family Name is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Confirm Password does not match"),
});

export default function Index() {
  const [enterInitialDetails, setEnterInitialDetails] = useState(true);
  const [enterVerifCode, setEnterVerifCode] = useState(false);
  const [enterPatientDetails, setEnterPatientDetails] = useState(false);
  const [enterDoctorDetails, setEnterDoctorDetails] = useState(false);
  const [selectUserRole, setSelectUserRole] = useState(false);



  const [verifCode, setVerifCode] = useState("");

  const [formData, setFormData] = useState<IFormInput>({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const [userRole, setUserRole] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setUserRole(event.target.value as string);
  };


  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const redirectTo = useCallback(
    (path: string) => {
      router.replace(path).finally(() => {});
    },
    [router]
  );


  const EnteredVerificationCode = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const code = verifCode;

    setSelectUserRole(true);
    setEnterInitialDetails(false);
    setEnterVerifCode(false);

    if (code.length === 0 || !code) return;
  }

  const onSubmit = async (data: IFormInput) => {
    setFormData(data);
    setEnterVerifCode(true);
  };

  return (
    <LayoutProvider>
      <Container maxWidth="xs">



    {
      enterDoctorDetails && <>
        
        <Typography variant="h6" gutterBottom>
          Doctor Details
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
      }

      {
        enterPatientDetails && <>
        
        <Typography variant="h6" gutterBottom>
          Patient Details
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
      }

        {
          selectUserRole && 
          <>
            <Typography variant="h5" align="center">
              Account created successfully!
            </Typography>

        <br/>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Are you a doctor or a patient?</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userRole}
            label="Are you a doctor or a patient?"
            onChange={handleChange}
          >
            <MenuItem value={"D"}>I am a Doctor</MenuItem>
            <MenuItem value={"P"}>I am a Patient</MenuItem>
          </Select>

        </FormControl>
            <Button       
            onClick={()=> {
              setSelectUserRole(false);

              if (userRole == "D") {
                setEnterDoctorDetails(true);
              }
              else if (userRole == "P") {
                setEnterPatientDetails(true);
              }

            }}        
            fullWidth
            variant="contained"
            color="primary"
          >
            Continue
          </Button>

            <br/><br/><br/>
              <Button       
                onClick={()=> {setSelectUserRole(false); setEnterInitialDetails(true)}}        
                fullWidth
                variant="contained"
                color="primary"
              >
                Go back
              </Button>
          </>
        }

        {
          enterVerifCode && (
            <form onSubmit={EnteredVerificationCode} autoComplete="off">
              <Typography textAlign="center" variant="h5">
                Enter Verification Code
              </Typography>

              <TextField
                name="verificationCode"
                label="Verification Code"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setVerifCode(e.target.value)}
              />

              <Button               
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Verify
              </Button>

                <br/><br/><br/>

              <Button       
                onClick={()=> {setEnterVerifCode(false);}}        
                fullWidth
                variant="contained"
                color="primary"
              >
                Go back
              </Button>
            </form>
          )
        }

        {!enterVerifCode && enterInitialDetails && (
        <div>
        <Typography textAlign="center" variant="h5">
          Register
        </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <TextField
              label="First name"
              {...register("fname")}
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.fname?.message}
            </Typography>

            <TextField
              label="Last name"
              {...register("lname")}
              variant="outlined"
              margin="normal"
              fullWidth
            />

            <Typography variant="inherit" color="textSecondary">
              {errors.lname?.message}
            </Typography>

            <TextField
              label="Email"
              {...register("email")}
              autoComplete="off"
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.email?.message}
            </Typography>


            <TextField
              {...register("password")}
              variant="outlined"
              label="Password"
              autoComplete="off"
              margin="normal"
              type="password"
              fullWidth
            />

            <Typography variant="inherit" color="textSecondary">
              {errors.password?.message}
            </Typography>

            <TextField
              {...register("confirmPassword")}
              variant="outlined"
              autoComplete="off"
              label="Confirm Password"
              margin="normal"
              type="password"
              fullWidth
            />

            <Typography variant="inherit" color="textSecondary">
              {errors.confirmPassword?.message}
            </Typography>

            <br/>

            <Button
              
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Register
            </Button>
            <p
              className="text-center text-danger text-decoration-underline mt-4 cursor-pointer"
              color="primary"
              onClick={() => {
                redirectTo("/auth/login");
              }}
            >
              Already have an account?
            </p>
          </form>
          </div>
        )}


      </Container>
    </LayoutProvider>
  );
}
