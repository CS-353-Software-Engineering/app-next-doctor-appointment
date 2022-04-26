export enum UserRole {
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
  UNKNOWN = "UNKNOWN",
}

export const whitelistedPaths = ["/sprint1/demo","/auth/register"]

export const policies: { urls: string[]; role: UserRole }[] = [
  {
    urls: ["/doctor",...whitelistedPaths],
    role: UserRole.DOCTOR,
  },
  {
    urls: ["/patient",...whitelistedPaths],
    role: UserRole.PATIENT,
  },
  {
    urls: ["/unauthorized",...whitelistedPaths],
    role: UserRole.UNKNOWN,
  },
];
