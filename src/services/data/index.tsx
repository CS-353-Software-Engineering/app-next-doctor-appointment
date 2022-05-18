import { API, graphqlOperation } from "@aws-amplify/api";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import { UserRole } from "../../constants/policies/access.control.policy";


interface CreateUserInput {
    id: string,
    email: string,
    type: UserRole
}

interface CreateUserDataInput {
    id: string,
    email: string,
    fName: string,
    lName: string,
    number: string
}

interface CreatePatientInput extends CreateUserDataInput {

}

interface CreateDoctorInput extends CreateUserDataInput {

}
export default class DB {

    static async createUser(basicDetails: CreateUserInput) {

        let data = {
            id: basicDetails.id,
            email: basicDetails.email,
            type: basicDetails.type,

        };
        console.log(data)

        await API.graphql(graphqlOperation(mutations.createUser, data));
    }

    static async createPatient(input: CreatePatientInput) {
        let data = {
            input: {
                id: input.id,
                email: input.email,
                fName: input.fName,
                lName: input.lName,
                number: input.number
            }
        };
        await API.graphql(graphqlOperation(mutations.createPatient, data));
    }

    static async createDoctor(input: CreateDoctorInput) {
        let data = {
            input: {
                id: input.id,
                email: input.email,
                fName: input.fName,
                lName: input.lName,
                number: input.number
            }
        };
        await API.graphql(graphqlOperation(mutations.createDoctor, data));
    }

    static async getUser(id: string) {

        console.log("Fetching user: ", id);

        const user = await API.graphql({
            query: queries.getUser,
            variables: { id: id },
        });

        //@ts-ignore
        let userData = user?.data?.getUser;

        if (userData?.type === UserRole.PATIENT) {
            const patient = await this.getPatient(id);
            userData = Object.assign({}, userData, patient);
        }
        else if (userData?.type === UserRole.DOCTOR) {
            const doctor = await this.getDoctor(id);
            userData = Object.assign({}, userData, doctor);
        }

        return userData;
    }

    static async getPatient(id: string) {

        let patient = await API.graphql({
            query: queries.getPatient,
            variables: { id: id },
        });

        //@ts-ignore
        return patient?.data?.getPatient;
    }

    static async getDoctor(id: string) {

        let doctor = await API.graphql({
            query: queries.getDoctor,
            variables: { id: id },
        });

        //@ts-ignore
        return doctor?.data?.getDoctor;
    }


}
