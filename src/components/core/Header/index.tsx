import { Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import styles from "./styles.module.scss";
import AuthContext from '../../../contexts/shared/auth/authContext';

interface UserHeaderData {
  readonly id: string;
  readonly fName: string;
  readonly lName: string;
  readonly photo: string;
  readonly email: string;
}

export type HeaderProps = {
  user?: UserHeaderData;
};

export default function Header(props: HeaderProps): JSX.Element {

  const { logout } = useContext(AuthContext);

  const Logout = () => {
    logout();
  }

  return (
    <Navbar
      bg="light"
      expand="lg"
      className={`${styles.header} h-bar bg-white`}
    >
      {props.user && (
        <Container className="m-0 px-4" fluid>
          <Navbar.Text className="align-middle">
            Welcome{" "}
            <strong>
              {props.user?.fName} {props.user?.lName}
            </strong>
          </Navbar.Text>

          <Navbar.Text className="d-flex flex-row justify-content-center align-items-center">
            &nbsp;
            {`${props.user?.email ?? 'johndoe@potato.com'}`}
            &nbsp;&nbsp;&nbsp;
            <Button onClick={() => {
              Logout();
            }} fullWidth variant="contained" color="primary">
              Logout
            </Button>
          </Navbar.Text>

        </Container>
      )}
    </Navbar>
  );
}
