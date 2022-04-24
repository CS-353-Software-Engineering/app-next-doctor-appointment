import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DefaultLayout from "../src/components/layout/DefaultLayout/defaultLayout";
import { Spinner } from "react-bootstrap";
import { Container, Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";

interface IFormInput {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  fullname: yup.string().required("Fullname is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Confirm Password does not match"),
});

export default function Register() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInput) => {
    setLoading(true);
    console.log(data.email, data.password);
    setLoading(false);
  };

  return (
    <DefaultLayout>
      <Container maxWidth="xs">
        <Typography textAlign="center" variant="h5">
          Register
        </Typography>

        {!loading && (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Full name"
              {...register("fullname")}
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.fullname?.message}
            </Typography>

            <TextField
              label="Email"
              {...register("email")}
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
              label="Confirm Password"
              margin="normal"
              type="password"
              fullWidth
            />

            <Typography variant="inherit" color="textSecondary">
              {errors.confirmPassword?.message}
            </Typography>

            <Button
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          </form>
        )}

        {loading && (
          <div style={{ textAlign: "center" }}>
            <br />
            <Spinner animation="border" color="white"></Spinner>
          </div>
        )}
      </Container>
    </DefaultLayout>
  );
}
