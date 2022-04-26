export enum UserRole {
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
  UNKNOWN = "UNKNOWN",
}

export const policies: { urls: string[]; role: UserRole }[] = [
  {
    urls: ["/doctor"],
    role: UserRole.DOCTOR,
  },
  {
    urls: ["/patient"],
    role: UserRole.PATIENT,
  },
  {
    urls: ["/unauthorized"],
    role: UserRole.UNKNOWN,
  },
];
