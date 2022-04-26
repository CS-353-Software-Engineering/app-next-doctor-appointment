export enum PageMode {
    PATIENT_DETAIL_PAGE,
    DOCTOR_DETAILS_PAGE,
    REGISTER_USER_PAGE,
    VERIFY_USER_PAGE,
    ROLE_PICKER_PAGE,
}

export interface UserFormInput {
    id: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface PatientFormInput {
    fName: string;
    lName: string;
    number: string;
}

export interface DoctorFormInput {
    fName: string;
    lName: string;
    number: string;
}