import { UserRole } from "../../constants/policies/access.control.policy";
import { AuthManager } from "../../services/auth";

export interface UserData {
  readonly id: string;
  readonly fName?: string;
  readonly lName?: string;
  readonly email?: string;
  readonly photo?: string;
}

export class User {
  readonly id: string = "";
  readonly fName: string;
  readonly lName: string;
  readonly email: string;
  readonly photo: string;
  readonly role: UserRole;

  constructor(data: UserData) {
    this.id = data?.id;
    this.fName = data?.fName ?? "";
    this.lName = data?.lName ?? "";
    this.email = data?.email ?? "";
    this.photo = data?.photo ?? "";
    this.role = UserRole.DOCTOR;
  }
  static async loadUser(): Promise<User> {
    // console.log("GETTING USER")

    const authUser = await AuthManager.shared.getUser();

    // const databaseUser: DoubtSolverDB = await DatabaseManager.getDoubtSolver(authUser.id)

    const user = new User(authUser);
    // console.log("user", user)
    return user;
  }
}
