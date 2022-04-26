import { API, graphqlOperation } from "@aws-amplify/api";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import { UserRole } from "../../constants/policies/access.control.policy";



interface CreateUserInput{
    id:string,
    email:string,
    type:UserRole
}

interface CreateUserDataInput{
    id:string,
    email:string,
    fName:string,
    lName:string,
    number:string
}

interface CreatePatientInput extends CreateUserDataInput{
    
}

interface CreateDoctorInput extends CreateUserDataInput{
    
}
export default class DB {



    static async createUser(basicDetails:CreateUserInput) {
   
        let data = {
                id:basicDetails.id,
                email:basicDetails.email,
                type:basicDetails.type,
            
                   };
        console.log(data)

        await API.graphql(graphqlOperation(mutations.createUser, data));
    }

    static async createPatient(input: CreatePatientInput) {
        let data = {
            input:{
                id:input.id,
                email:input.email,
                fName:input.fName,
                lName:input.lName,
                number:input.number
            }
        };
        console.log(data)

        await API.graphql(graphqlOperation(mutations.createPatient, data));
    }

    static async createDoctor(input: CreateDoctorInput) {
        let data = {
            input:{
                id:input.id,
                email:input.email,
                fName:input.fName,
                lName:input.lName,
                number:input.number
            }
        };
        console.log(data)
        await API.graphql(graphqlOperation(mutations.createDoctor, data));
    }

    static async getUser(id: string) {
        let data = {
            id
        };
        console.log(data)
        const response = await API.graphql(graphqlOperation(queries.getUser, data));
        console.log("response?.data?.getUser",response)
        //@ts-ignore
        return response?.data?.getUser
    }


}
