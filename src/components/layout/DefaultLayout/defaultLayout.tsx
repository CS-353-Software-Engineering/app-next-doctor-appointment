import PropTypes from "prop-types";
import Header, { HeaderProps } from "../../core/Header";
import Footer, { FooterProps } from "../../core/Footer";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.scss";
import AuthContext from "../../../contexts/shared/auth/authContext";
import { useContext, useEffect } from "react";

type DefaultLayoutDataProps = {
  headerProps: HeaderProps;
  footerProps: FooterProps;
};

export type DefaultLayoutProps = {
  children: any;
  data: DefaultLayoutDataProps;
  showHeader: boolean;
  showSideBar: boolean;
};

const DefaultLayout = (props: DefaultLayoutProps) => {
  const { children } = props;

  const { user } = useContext(AuthContext);

  const headerProps = { user };

  useEffect(() => {

  }, [user])



  return (
    <>
      <Container fluid className="bg-color">
        <Row id="main-container">
          <Col className="p-0 m-0" id={styles["page-content-wrapper"]}>
            {<Header {...headerProps} />}
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
