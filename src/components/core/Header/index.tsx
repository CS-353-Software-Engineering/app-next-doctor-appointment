import React from "react";
import { Container, Navbar } from "react-bootstrap";
import styles from "./styles.module.scss";

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
        </Container>
      )}
    </Navbar>
  );
}
