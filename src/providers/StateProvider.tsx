import { AuthState } from "../contexts/shared/auth/authState";
import {UserRole} from "../constants/policies/access.control.policy";
import {useContext} from "react";
import AuthContext from "../contexts/shared/auth/authContext";
import {DoctorsState} from "../contexts/patient/doctors/doctorsState";

type StateProviderProps = {
  children: any;
};

//Manage States for each Tenant
const TenantStateProvider = (props: StateProviderProps) => {

  const {user} = useContext(AuthContext)
  // console.warn("TENANT PROVIDER ", user)

  if (user?.role === UserRole.PATIENT) {
    return (
        <DoctorsState>
          {props.children}
        </DoctorsState>
    )
  }

  return <>{props.children}</>;
};

export const StateProvider = (props: StateProviderProps) => {

  return (
    <AuthState>
      {/*@ts-ignore*/}
      <TenantStateProvider>{props.children}</TenantStateProvider>
    </AuthState>
  );
};
