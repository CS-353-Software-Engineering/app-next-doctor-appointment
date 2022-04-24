import { Col, Row } from "react-bootstrap";
import { APPLICATION_NAME, COPYRIGHT } from "../../../constants";
import styles from "./styles.module.scss";

export type FooterProps = {
  appName: string;
  copyright: string;
};

export default function Footer() {
  return (
    <footer className={`${styles.footer} mt-5`}>
      <Row className="w-100 px-2">
        <Col>
          <div className="nav nav-trim justify-content-between">
            <small className="">{APPLICATION_NAME}</small>
            <small>{COPYRIGHT}</small>
          </div>
        </Col>
      </Row>
    </footer>
  );
}
