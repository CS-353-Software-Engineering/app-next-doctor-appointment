import {BookingStatus } from "../../../constants/bookings/booking.state";
import Doctor from "../../../models/doctor/doctor.model"
import Patient from "../../../models/patient/patient.model"

export class BookingDB {
	readonly id: string;
	readonly bookingDateTime: Date;
	readonly updatedAt?: Date;
	readonly doctorBookingPatientId?: string;
	readonly doctorBookingDoctorId?: string;
	readonly status: BookingStatus;

	readonly patient: Patient;
	readonly doctor: Doctor;

	constructor(data: any) {
		this.id = data?.id;
		this.bookingDateTime = data.bookingDateTime;
		this.updatedAt = data?.updatedAt;
		this.doctorBookingPatientId = data?.doctorBookingPatientId ?? "";
		this.doctorBookingDoctorId = data?.doctorBookingDoctorId ?? "";
		this.status = data?.status ?? BookingStatus.PENDING;

		this.patient = new Patient(data?.patient);
		this.doctor = data?.doctor ?? {};

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
