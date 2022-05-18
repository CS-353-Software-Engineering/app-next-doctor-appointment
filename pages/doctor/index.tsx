import * as React from "react";
import { LayoutProvider } from "../../src/providers/LayoutProvider";
import { Table } from "react-bootstrap"

export default function PatientsList() {

    return (
        <LayoutProvider>
            <div>
                <h3 className="text-center">List Of Patients</h3>

                <Table>
                    <tbody>

                    </tbody>
                </Table>
            </div>
        </LayoutProvider>
    );
}
