import { AuthState } from "../contexts/shared/auth/authState";
import {UserRole} from "../constants/policies/access.control.policy";
import {useContext} from "react";
import AuthContext from "../contexts/shared/auth/authContext";
import {DoctorsState} from "../contexts/patient/doctors/doctorsState";
import {BookingsState} from "../contexts/shared/bookings/bookingsState";
import {NotificationsState} from "../contexts/shared/notifications/notificationsState";

type StateProviderProps = {
  children: any;
};

//Manage States for each Tenant
const TenantStateProvider = (props: StateProviderProps) => {

  // const {user} = useContext(AuthContext)
  // console.warn("TENANT PROVIDER ", user)
  //
  // if (user?.role === UserRole.PATIENT) {
  //   return (
  //       <DoctorsState>
  //         {props.children}
  //       </DoctorsState>
  //   )
  // }

  return <>{props.children}</>;
};

export const StateProvider = (props: StateProviderProps) => {

  return (
    <AuthState>
        <NotificationsState>
          <BookingsState>
              <DoctorsState>
                {/*@ts-ignore*/}
                <TenantStateProvider>{props.children}</TenantStateProvider>
              </DoctorsState>
          </BookingsState>
        </NotificationsState>
    </AuthState>
  );
};
