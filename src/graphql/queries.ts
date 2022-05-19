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

export const listDoctors = `
	query MyQuery {
	  listDoctors {
	    items {
	      bio
	      department {
	        name
	      }
	      email
	      fName
	      id
	      lName
	      number
	      profileImage
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

export const listBookings = `
	query listDoctorBookings {
  listDoctorBookings {
    items {
      bookingDateTime
      createdAt
      doctor {
        id
        fName
        lName
        profileImage
        department {
          name
        }
      }
      doctorBookingDoctorId
      doctorBookingPatientId
      id
      patient {
        id
        fName
        lName
      }
      status
    }
  }
}
`;

export const getBooking = `
	query getDoctorBooking($id: ID = "") {
  getDoctorBooking(id: $id) {
    items {
      bookingDateTime
      createdAt
      doctor {
        id
        fName
        lName
        profileImage
        department {
          name
        }
      }
      doctorBookingDoctorId
      doctorBookingPatientId
      id
      patient {
        id
        fName
        lName
      }
      status
    }
  }
}
`;
