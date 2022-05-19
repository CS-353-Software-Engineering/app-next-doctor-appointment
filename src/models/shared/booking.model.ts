import {BookingStatus } from "../../constants/bookings/booking.state";
import Doctor from "../doctor/doctor.model";
import {BookingDB} from "../../services/data/models/booking.db.model";
import {formatDate} from '../../helpers'


interface PatientDetails {
    readonly id: string
    readonly fName: string
    readonly lName: string
}


export class Booking {
  readonly id: string;
  readonly bookedOn?: string;
  readonly lastUpdated?: string | undefined;
  readonly patientID?: string;
  readonly doctorID?: string;
  readonly status: BookingStatus;

  readonly patient: PatientDetails;
  readonly doctor: Doctor;

  constructor(data: BookingDB) {
    this.id = data?.id;
    this.bookedOn = data?.bookingDateTime ?? null;
    this.lastUpdated = data?.updatedAt;
    this.patientID = data?.doctorBookingPatientId ?? "";
    this.doctorID = data?.doctorBookingDoctorId ?? "";
    this.status = data?.status ?? BookingStatus.PENDING;

    this.patient = data?.patient;
    this.doctor = data?.doctor;

  }

  // static async loadUser(): Promise<User> {
  //   const authUser = await AuthManager.shared.getUser();
  //   const databaseUser = await DB.getUser(authUser.id);
  //
  //   const role =
  //     databaseUser?.type == UserRole.DOCTOR
  //       ? UserRole.DOCTOR
  //       : UserRole.PATIENT;
  //
  //   let user = new User({ ...databaseUser, role });
  //   return user;
  // }
}
