import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spinner } from "react-bootstrap";
import { Button, Container, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useCallback, useContext, useState } from "react";
import AuthContext from "../../../src/contexts/shared/auth/authContext";
import { useRouter } from "next/router";
import { LayoutProvider } from "../../../src/providers/LayoutProvider";

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
    .max(20, "Password must not exceed 40 characters"),
});

export default function Index() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { login } = useContext(AuthContext);

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

    login({ username: data.email, password: data.password })
      .then(() => {
        alert("Logged in");
      })
      .catch((error) => {
        console.error(error);
        alert("Incorrect username/password");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const redirectTo = useCallback(
    (path: string) => {
      router.replace(path).finally(() => {});
    },
    [router]
  );

  return (
    <LayoutProvider>
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
            <p
              className="text-center text-danger text-decoration-underline mt-4 cursor-pointer"
              color="primary"
              onClick={() => {
                redirectTo("/auth/register");
              }}
            >
              Do not have an account? Sign up today!
            </p>
          </form>
        )}

        {loading && (
          <div style={{ textAlign: "center" }}>
            <br />
            <Spinner animation="border" color="white" />
          </div>
        )}
      </Container>
    </LayoutProvider>
  );
}
