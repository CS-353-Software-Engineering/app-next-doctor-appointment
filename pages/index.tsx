import type { NextPage } from "next";
import {Spinner, Row, Col} from "react-bootstrap";

import Head from "next/head";
import { APPLICATION_NAME } from "../src/constants";

const LoadingPage: NextPage = () => {
  return (
      <>
          <Head>
              <title>{APPLICATION_NAME}</title>
              <link rel="icon" href="/doctor.png" />
          </Head>

          <Row className="justify-content-center align-items-center">
          <Col className="justify-content-center align-items-center">
              <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
              </Spinner>
          </Col>
      </Row>
      </>
  );
};

export default LoadingPage;
