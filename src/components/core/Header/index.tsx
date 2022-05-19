import { Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Container, Navbar, Nav, } from "react-bootstrap";
import Link from "next/link";
import styles from "./styles.module.scss";
import AuthContext from '../../../contexts/shared/auth/authContext';
import {UserRole} from "../../../constants/policies/access.control.policy";


interface UserHeaderData {
  readonly id: string;
  readonly fName: string;
  readonly lName: string;
  readonly photo: string;
  readonly email: string;
  readonly role: UserRole
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

          <Nav navbar={false}>
            <Nav.Item>
              <Link
                  href={`/${props.user.role.toLocaleLowerCase()}`}
                  passHref
              >
                <Nav.Link
                    className="w-100 my-3"
                >
                  Home
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                  href={`/${props.user.role.toLocaleLowerCase()}/bookings`}
                  passHref
              >
                <Nav.Link
                    className="w-100 my-3"
                >
                  Bookings
                </Nav.Link>
              </Link>
            </Nav.Item>
          </Nav>

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
