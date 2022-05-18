import { AuthState } from "../contexts/shared/auth/authState";

type StateProviderProps = {
  children: any;
};

//Manage States for each Tenant
const TenantStateProvider = (props: StateProviderProps) => {
  return <>{props.children}</>;
};

export const StateProvider = (props: StateProviderProps) => {
  return (
    <AuthState>
      <TenantStateProvider>{props.children}</TenantStateProvider>
    </AuthState>
  );
};
