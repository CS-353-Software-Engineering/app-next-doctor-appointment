
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Auth } from "aws-amplify";
import { ForgotPasswordMode } from "../../../../../constants/helpers";
import { useState } from "react";


interface IFormInput {
    email: string;
}
const schema = yup.object().shape({
    email: yup.string().required("Email is required").email("Email is invalid"),
});

export default function EmailForm(props: any) {


    const [emailNotFound, setEmailNotFound] = useState(false);

    const {
        setForgotPasswordMode,
        setUserEmail,
    } = props;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: IFormInput) => {
        setEmailNotFound(false);
        const userName = data.email;
        setUserEmail(userName);
        Auth.forgotPassword(userName).then((value) => {
            console.log(value);
            setForgotPasswordMode(ForgotPasswordMode.RESET_PASSWORD);
        }).catch((error) => {
            console.log(error);
            setEmailNotFound(true);
        });
    };


    return (
        <>
            <Typography textAlign="center" variant="h5">
                Forgot Password
            </Typography>


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

                {emailNotFound &&
                    <Typography variant="inherit" color="textSecondary">
                        Email not found
                    </Typography>
                }

                <Button
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