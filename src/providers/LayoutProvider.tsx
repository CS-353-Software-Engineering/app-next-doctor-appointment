import { useContext } from "react";
import AuthContext from "../contexts/shared/auth/authContext";
import { LoginStatus } from "../contexts/shared/auth/types";
import { APP_VERSION, COPYRIGHT } from "../constants";
import { UserRole } from "../constants/policies/access.control.policy";
import { Spinner } from "react-bootstrap";
import DefaultLayout from "../components/layout/DefaultLayout/defaultLayout";

type LayoutProviderProps = {
  children: any;
};

export const LayoutProvider = (props: LayoutProviderProps) => {
  const { user, logout, isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === LoginStatus.UNKNOWN) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 vw-100">
        <Spinner animation="border" className="text-black" />
        Authenticating
      </div>
    );
  }

  if (isLoggedIn === LoginStatus.LOGGED_IN && user?.role === UserRole.UNKNOWN) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 vw-100">
        <h2 className="text-danger">UnAuthorized</h2>
      </div>
    );
  }

  return (
    <DefaultLayout
      showHeader
      showSideBar
      data={{
        headerProps: { user },
        footerProps: { copyright: COPYRIGHT, appName: APP_VERSION },
      }}
    >
      {props.children}
    </DefaultLayout>
  );
};
