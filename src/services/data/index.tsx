import { API, graphqlOperation } from "@aws-amplify/api";
import * as mutations from "../../graphql/mutations";
import { UserFormInput, PatientFormInput, DoctorFormInput } from "../../constants/helpers";


export default class DB {

    static async createPatient(userInfo: UserFormInput, patientInfo: PatientFormInput) {
        const {
            id,
            email,
        } = userInfo;

        const {
            fName,
            lName,
            number
        } = patientInfo;

        let data = {
            input: {
                id,
                email: email,
                fName: fName,
                lName: lName,
                number: number
            },
        };
        await API.graphql(graphqlOperation(mutations.createPatient, data));
    }


    static async createDoctor(userInfo: UserFormInput, doctorInfo: DoctorFormInput) {
        const {
            email,
        } = userInfo;

        const {
            fName,
            lName,
            number
        } = doctorInfo;

        let data = {
            input: {
                email: email,
                fName: fName,
                lName: lName,
                number: number
            },
        };
        await API.graphql(graphqlOperation(mutations.createDoctor, data));
    }

}
