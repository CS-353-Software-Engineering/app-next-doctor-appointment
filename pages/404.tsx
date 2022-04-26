import Head from "next/head";
import { NextPage } from "next";
import Link from "next/link";
import { APPLICATION_NAME } from "../src/constants";
import { Row, Col } from "react-bootstrap";

const NotFoundPage: NextPage = () => {
  return (
    <div className="vw-100 vh-100 d-flex align-items-center justify-content-center">
      <Head>
        <title>{APPLICATION_NAME}</title>
      </Head>

      <main>
        <Row>
          <Col className="text-center">
            <h1 className="fw-semibold text-capitalize">404: Page not found</h1>
            <p>
              Return to <Link href="/">Home Page</Link>
            </p>
          </Col>
        </Row>
      </main>
    </div>
  );
};
export default NotFoundPage;
