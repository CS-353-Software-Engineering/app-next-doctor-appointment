export const getUser = `
query getUser($id: ID!) {
  getUser(id: $id) {
      email
      createdAt
      id
      updatedAt
      type
  }
}
`;

export const getPatient = `
query getPatient($id: ID!) {
  getPatient(id: $id) {
    fName
    createdAt
    email
    id
    lName
    number
    profileImage
    updatedAt
  }
}
`;

export const getDoctor = `
query getDoctor($id: ID!) {
  getDoctor(id: $id) {
    fName
    createdAt
    email
    id
    lName
    number
    profileImage
    updatedAt
    bio
    department {
      id
      name
    }
  }
}
`;

export const listDepartments = `
query listDepartments {
  listDepartments {
    items {
      id
      name
    }
  }
}
`;
