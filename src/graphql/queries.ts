export const getUser = `
query MyQuery($id: ID!) {
    getUser(id: $id) {
      email
      createdAt
      id
      updatedAt
      type
    }
  }
  `