export enum UserRole {
    ADMIN = "ADMIN",
    DOUBT_SOLVER = "DOUBT_SOLVER",
    UNKNOWN = "UNKNOWN"
}


export const policies: { urls: string[], role: UserRole }[] = [
    {
        urls: ['/admin'],
        role: UserRole.ADMIN
    },
    {
        urls: ['/doubt-solver'],
        role: UserRole.DOUBT_SOLVER
    },


]


