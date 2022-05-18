





export const createUser = /* GraphQL */ `
mutation MyMutation2($email: String, $id: ID, $type: UserType = DOCTOR) {
  createUser(input: {id: $id, email: $email, type: $type}) {
    email
    id
  }
}
`;


export const createPatient = /* GraphQL */ `

  mutation createPatient(
    $input: CreatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    createPatient(input: $input, condition: $condition) {
    email
    fName
    lName
    number
    profileImage
    id
    createdAt
    }
  }
`;



export const createDoctor = /* GraphQL */ `
  mutation createDoctor(
    $input: CreateDoctorInput!
    $condition: ModelDoctorConditionInput
  ) {
    createDoctor(input: $input, condition: $condition) {
    email
    fName
    lName
    number
    profileImage
    id
    createdAt
    bio
    doctorDepartmentId
    }
  }
`;