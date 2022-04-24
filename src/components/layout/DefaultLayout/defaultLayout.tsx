import PropTypes from "prop-types";
import Header from "../../core/Header";
import Footer from "../../core/Footer";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.scss";

const DefaultLayout = (props: { children: React.ReactChild }) => {
  const { children } = props;

  return (
    <>
      <Container fluid className="bg-color">
        <Row id="main-container">
          <Col className="p-0 m-0" id={styles["page-content-wrapper"]}>
            {<Header />}
            <main id="main-content">{children}</main>
            <Footer />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DefaultLayout;

DefaultLayout.propTypes = {
  children: PropTypes.object,
};

DefaultLayout.defaultProps = {
  children: null,
  // isAuthenticated: null,
};
