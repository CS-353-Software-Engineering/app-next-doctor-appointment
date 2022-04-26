import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LayoutProvider } from "../../../../providers/LayoutProvider";
import DoctorForm from "./DoctorForm";
import PatientForm from "./PatientForm";
import VerifyAccountForm from "./VerifyAccountForm";
import RegisterForm from "./RegisterForm";
import RolePicker from "./RolePicker";
import { PageMode, UserFormInput } from "../../../../constants/helpers";
import { UserRole } from "../../../../constants/policies/access.control.policy";



export default function Register() {
  const [pageMode, setPageMode] = useState<PageMode>(
    PageMode.REGISTER_USER_PAGE
  );

  const [userRole, setUserRole] = useState<UserRole>(UserRole.PATIENT);
  const [userData, setUserData] = useState<UserFormInput>({
    id:"",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const router = useRouter();


  return (
    <LayoutProvider>
      <Container maxWidth="xs">
        {pageMode == PageMode.REGISTER_USER_PAGE && <RegisterForm setPageMode={setPageMode} setUserData={setUserData} />}
        {pageMode == PageMode.ROLE_PICKER_PAGE && <RolePicker setPageMode={setPageMode} userRole={userRole} setUserRole={setUserRole} />}
        {pageMode == PageMode.PATIENT_DETAIL_PAGE && <PatientForm setPageMode={setPageMode} userData={userData} />}
        {pageMode == PageMode.DOCTOR_DETAILS_PAGE && <DoctorForm setPageMode={setPageMode} userData={userData} />}
        {pageMode == PageMode.VERIFY_USER_PAGE && <VerifyAccountForm setPageMode={setPageMode} userData={userData} setID={(id) => {
          setUserData({...userData, id})
        }}/>}
      </Container>
    </LayoutProvider>
  );
}


