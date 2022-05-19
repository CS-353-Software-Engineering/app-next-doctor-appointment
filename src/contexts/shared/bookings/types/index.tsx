import {Booking} from "../../../../models/shared/booking.model";
import {BookingStatus} from "../../../../constants/bookings/booking.state";

type listBookingsFunctionType = () => Promise<void>

export type createBookingPropTypes = {
	bookingDateTime: Date,
	doctorBookingDoctorId: string,
	doctorBookingPatientId: string
}

export type updateBookingPropTypes = {
	bookingID: string,
	status: BookingStatus
}

export interface IBookingsContext {
	bookings?: Booking[],
	listBookings: listBookingsFunctionType
	createBooking: (props: createBookingPropTypes) => Promise<void>
	updateBooking: (props: updateBookingPropTypes) => Promise<void>
}

export const defaultState: IBookingsContext = {
	bookings: undefined,
	listBookings: async () => Promise.resolve(),
	createBooking: async () => Promise.resolve(),
	updateBooking: async () => Promise.resolve(),
}