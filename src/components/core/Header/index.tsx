import React from "react";
import { Container, Navbar } from "react-bootstrap";
import styles from "./styles.module.scss";

export default function Header(): JSX.Element {
  return (
    <Navbar
      bg="light"
      expand="lg"
      className={`${styles.header} h-bar bg-white`}
    >
      <Container className="m-0 px-4" fluid>
        <Navbar.Text className="align-middle">
          Welcome <strong>Ahmad Feroz</strong>
        </Navbar.Text>
      </Container>
    </Navbar>
  );
}
