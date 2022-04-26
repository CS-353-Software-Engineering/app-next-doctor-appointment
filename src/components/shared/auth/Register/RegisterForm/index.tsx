import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { PageMode, IFormInput } from "../../../../../constants/helpers";




const schema = yup.object().shape({
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

export default function RegisterForm(props: any) {

  const {
    setPageMode,
    setUserData,
  } = props


  const router = useRouter();

  const redirectTo = useCallback(
    (path: string) => {
      router.replace(path).finally(() => { });
    },
    [router]
  );


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });



  const onSubmit = (data: IFormInput) => {
    setPageMode(PageMode.ROLE_PICKER_PAGE);
    setUserData(data);
  };

  return (
    <div>
      <Typography textAlign="center" variant="h5">
        Register
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <TextField
          label="Email"
          {...register("email")}
          autoComplete="off"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Typography variant="inherit" className="text-danger ">
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

        <Typography variant="inherit" className="text-danger ">
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

        <Typography variant="inherit" className="text-danger ">
          {errors.confirmPassword?.message}
        </Typography>

        <br />

        <Button type="submit" fullWidth variant="contained" color="primary">
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
  );
}


