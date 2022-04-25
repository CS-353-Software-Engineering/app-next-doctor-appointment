import { useContext } from "react";
import AuthContext from "../contexts/shared/auth/authContext";
import { AuthState } from "../contexts/shared/auth/authState";

type StateProviderProps = {
  children: any;
};

//Manage States for each Tenant
const TenantStateProvider = (props: StateProviderProps) => {
  const { user } = useContext(AuthContext);
  //
  //
  // //Admin States
  // if (user?.role === UserRole.ADMIN) {
  //     return (
  //         <NotificationsState>
  //             <DoubtSolversState>
  //                 <DoubtQueriesState>
  //                     {props.children}
  //         </DoubtQueriesState>
  //         </DoubtSolversState>
  //         </NotificationsState>
  //     )
  // }
  //
  // //DoubtSolver States
  // if (user?.role === UserRole.DOUBT_SOLVER) {
  //     return (
  //         <NotificationsState>
  //             <QueriesState>
  //                 {props.children}
  //         </QueriesState>
  //         </NotificationsState>)
  // }

  return <>{props.children}</>;
};

export const StateProvider = (props: StateProviderProps) => {
  return (
    <AuthState>
      <TenantStateProvider>{props.children}</TenantStateProvider>
    </AuthState>
  );
};
