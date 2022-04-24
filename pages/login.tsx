import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DefaultLayout from "../src/components/layout/DefaultLayout/defaultLayout";
import { Spinner } from "react-bootstrap";
import { Container, Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";

interface IFormInput {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
});

export default function Login() {
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
          Login
        </Typography>

        {!loading && (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

            <Button
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Login
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
