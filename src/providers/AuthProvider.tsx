import { useCallback, useContext, useEffect } from "react";
import AuthContext from "../contexts/shared/auth/authContext";
import { LoginStatus } from "../contexts/shared/auth/types";
import { useRouter } from "next/router";
import {
  policies,
  UserRole,
  whitelistedPaths,
} from "../constants/policies/access.control.policy";
import { Spinner } from "react-bootstrap";

type AuthProviderProps = {
  children: any;
};

export const AuthProvider = (props: AuthProviderProps) => {
  const { user, isLoggedIn } = useContext(AuthContext);

  const router = useRouter();

  //MARK- Access Control
  const getRolePolicy = useCallback((role: string): { urls: string[] } => {
    const filteredPolicies = policies.filter((policy) => {
      return policy.role === role;
    });
    return filteredPolicies?.[0] ?? { urls: "" };
  }, []);

  const isAllowed = useCallback(
    (path: string): boolean => {
      const role: string = user?.role ?? UserRole.UNKNOWN;
      const policy = getRolePolicy(role);

      return (
        policy.urls.filter((url) => {
          return path?.startsWith(url);
        })?.length > 0
      );
    },
    [user, isLoggedIn]
  );

  const getRedirectPage = useCallback((): string => {
    const role: string = user?.role ?? UserRole.UNKNOWN;
    const policy = getRolePolicy(role);
    return `${policy.urls?.[0] ?? "/auth/login"}`;
  }, [user, isLoggedIn]);


  const isWhiteListed = (url: string): boolean => {
    console.log(whitelistedPaths)
    console.log(url)
    return whitelistedPaths.includes(url);
  }

  const checkAccess = (url: string) => {
    if (isLoggedIn == LoginStatus.UNKNOWN) {
      return;
    }

    if (isWhiteListed(url)) {
      return;
    }



    if (isLoggedIn == LoginStatus.LOGGED_OUT) {
      redirectTo("/auth/login");
      return;
    }


    if (!isAllowed(url)) {
      redirectTo(getRedirectPage());
      return;
    }

  };

  // Check Access Control on Start
  useEffect(() => {
    checkAccess(window.location.pathname);
  }, [isLoggedIn]);

  const redirectTo = useCallback((path: string) => {
    router.replace(path).finally(() => { });
  }, []);

  if (isLoggedIn === LoginStatus.UNKNOWN) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 vw-100">
        <Spinner animation="border" className="text-black" />
        Authenticating
      </div>
    );
  }

  return <>{props.children}</>;
};
