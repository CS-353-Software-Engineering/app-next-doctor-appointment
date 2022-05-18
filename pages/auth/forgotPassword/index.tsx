import { Container } from "@mui/material";
import { LayoutProvider } from "../../../src/providers/LayoutProvider";
import EmailFrom from "../../../src/components/shared/auth/ForgotPassword/EmailForm";
import ResetPasswordForm from "../../../src/components/shared/auth/ForgotPassword/ResetPasswordForm";
import { ForgotPasswordMode } from "../../../src/constants/helpers";
import { useState } from "react";

export default function Index() {

    const [forgotPasswordMode, setForgotPasswordMode] = useState<ForgotPasswordMode>(ForgotPasswordMode.SUBMIT_EMAIL);

    const [userEmail, setUserEmail] = useState<string>("");

    return (
        <LayoutProvider>
            < Container maxWidth="xs">

                {forgotPasswordMode == ForgotPasswordMode.SUBMIT_EMAIL &&
                    <EmailFrom setForgotPasswordMode={setForgotPasswordMode} setUserEmail={setUserEmail} />
                }

                {forgotPasswordMode == ForgotPasswordMode.RESET_PASSWORD &&
                    <ResetPasswordForm userEmail={userEmail}></ResetPasswordForm >
                }

            </Container>

        </LayoutProvider >
    );
}
