export enum PageMode {
    PATIENT_DETAIL_PAGE,
    DOCTOR_DETAILS_PAGE,
    REGISTER_USER_PAGE,
    VERIFY_USER_PAGE,
    ROLE_PICKER_PAGE,
}

export interface IFormInput {
    email: string;
    password: string;
    confirmPassword: string;
}