import * as React from "react";
import { LayoutProvider } from "../../src/providers/LayoutProvider";
import { Row, Col, } from "react-bootstrap"
import { useContext } from "react";
import AuthContext from "../../src/contexts/shared/auth/authContext";
import Link from "next/link";
import { UserRole } from "../../src/constants/policies/access.control.policy";

export default function PatientsList() {
    const { user } = useContext(AuthContext)

    if (!user || user?.role == UserRole.PATIENT) {
        return (<div></div>);
    }

    return (
        <LayoutProvider>
            <Row className="text-center vh-100 vw-100">
                <Col className="d-flex flex-column justify-content-center align-items-center vh-100 vw-100">
                    <h3>Hello, {user?.fName}</h3>
                    <h4>Welcome to your Find Me A Doctor portal</h4>
                    <p>Head over to the &nbsp;
                        <Link
                            href="/doctor/bookings"
                            passHref
                        >
                            Bookings Page
                        </Link>
                        &nbsp; to view any bookings you may have</p>
                </Col>
            </Row>
        </LayoutProvider>
    );
}
