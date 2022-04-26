import { Container } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { LayoutProvider } from "../../../../providers/LayoutProvider";
import DoctorForm from "./DoctorForm";
import PatientForm from "./PatientForm";
import VerifyAccountForm from "./VerifyAccountForm";
import RegisterForm from "./RegisterForm";
import RolePicker from "./RolePicker";

export default function Register() {
  const [pageMode, setPageMode] = useState<PageMode>(
    PageMode.REGISTER_USER_PAGE
  );

  const router = useRouter();

  const redirectTo = useCallback(
    (path: string) => {
      router.replace(path).finally(() => {});
    },
    [router]
  );
  //
  // const EnteredVerificationCode = async (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   const code = verifCode;
  //
  //   setSelectUserRole(true);
  //   setEnterInitialDetails(false);
  //   setEnterVerifCode(false);
  //
  //   if (code.length === 0 || !code) return;
  // };
  //
  // const onSubmit = async (data: IFormInput) => {
  //   setFormData(data);
  //   setEnterVerifCode(true);
  // };

  const navigate = () => {};

  return (
    <LayoutProvider>
      <Container maxWidth="xs">
        {pageMode == PageMode.PATIENT_DETAIL_PAGE && <PatientForm />}
        {pageMode == PageMode.DOCTOR_DETAILS_PAGE && <DoctorForm />}
        {pageMode == PageMode.ROLE_PICKER_PAGE && <RolePicker />}
        {pageMode == PageMode.VERIFY_USER_PAGE && <VerifyAccountForm />}
        {pageMode == PageMode.REGISTER_USER_PAGE && <RegisterForm />}
      </Container>
    </LayoutProvider>
  );
}

enum PageMode {
  PATIENT_DETAIL_PAGE,
  DOCTOR_DETAILS_PAGE,
  REGISTER_USER_PAGE,
  VERIFY_USER_PAGE,
  ROLE_PICKER_PAGE,
}
