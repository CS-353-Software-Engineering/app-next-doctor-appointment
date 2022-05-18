
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Auth } from "aws-amplify";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";

interface IFormInput {
    otp: string;
    password: string;
    confirmPassword: string;
}
const schema = yup.object().shape({
    otp: yup.string().required("OTP is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string().required("Confirm Password is required").oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default function ResetPasswordForm(props: any) {

    const {
        userEmail,
    } = props;


    const router = useRouter();

    const [errorOccured, setErrorOccured] = useState(false);
    const [loading, setLoading] = useState(false);

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

    const onSubmit = async (data: IFormInput) => {
        const email = userEmail;
        const OTP = data.otp;
        const password = data.password;
        setLoading(true);

        Auth.forgotPasswordSubmit(email, OTP, password)
            .then((value) => { console.log(value); redirectTo("/auth/login"); })
            .catch((error) => { console.log(error); setErrorOccured(true); })
            .finally(() => { setLoading(false); });
    };


    return (
        <>
            <Typography textAlign="center" variant="h5">
                Forgot Password
            </Typography>


            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                    label="OTP code"
                    {...register("otp")}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <Typography variant="inherit" color="textSecondary">
                    {errors.otp?.message}
                </Typography>


                <TextField
                    label="New Password"
                    {...register("password")}
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <Typography variant="inherit" color="textSecondary">
                    {errors.password?.message}
                </Typography>


                <TextField
                    label="Confirm new Password"
                    {...register("confirmPassword")}
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <Typography variant="inherit" color="textSecondary">
                    {errors.confirmPassword?.message}
                </Typography>


                {errorOccured &&
                    <Typography variant="inherit" color="textSecondary">
                        An error occured while resetting password.
                    </Typography>
                }
                <Button
                    disabled={loading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Submit
                </Button>


            </form>

        </>);
}