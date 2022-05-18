export const createUser = `
mutation MyMutation2($email: String, $id: ID, $type: UserType = DOCTOR) {
  createUser(input: {id: $id, email: $email, type: $type}) {
    email
    id
  }
}
`;


export const createPatient = `

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



export const createDoctor = `
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

export const createBooking = `
  mutation createDoctorBooking($bookingDateTime: AWSDateTime = "", $doctorBookingDoctorId: ID = "", $doctorBookingPatientId: ID = "") {
  createDoctorBooking(input: {bookingDateTime: $bookingDateTime, doctorBookingDoctorId: $doctorBookingDoctorId, doctorBookingPatientId: $doctorBookingPatientId, status: PENDING}) {
    bookingDateTime
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
    updatedAt
    createdAt
  }
}
`;

export const updateBooking = `
  mutation MyMutation($id: ID = "", $status: BookingStatus = PENDING) {
  updateDoctorBooking(input: {id: $id, status: $status})  {
    bookingDateTime
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
    updatedAt
    createdAt
  }
}
`;