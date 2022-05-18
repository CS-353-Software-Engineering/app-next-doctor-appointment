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
        console.log(data)

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
        console.log(data)
        await API.graphql(graphqlOperation(mutations.createDoctor, data));
    }

    static async getUser(id: string) {

        console.log("USER ID", id);

        const user = await API.graphql({
            query: queries.getUser,
            variables: { id: id },
        });

        //@ts-ignore
        const userData = user?.data?.getUser;

        console.log("User:", user);

        // if (userData?.type === UserRole.PATIENT) {
        //     this.getPatient(id);
        // }
        // else if (userData?.type === UserRole.DOCTOR) {
        //     this.getDoctor(id);
        // }

        return userData;
    }

    static async getPatient(id: string) {

        let patient = await API.graphql({
            query: queries.getPatient,
            variables: { id: id },
        });

        console.log("Patient", patient);
        return patient;
    }

    static async getDoctor(id: string) {

        let doctor = await API.graphql({
            query: queries.getDoctor,
            variables: { id: id },
        });

        console.log("Doctor", doctor);
        return doctor;
    }


}
