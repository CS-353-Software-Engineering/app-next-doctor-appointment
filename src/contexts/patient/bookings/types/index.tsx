import {Booking} from "../../../../models/shared/booking.model";

type listBookingsFunctionType = () => Promise<void>

export type createBookingPropTypes = {
	bookingDateTime: Date,
	doctorBookingDoctorId: string,
	doctorBookingPatientId: string
}

export interface IBookingsContext {
	bookings?: Booking[],
	listBookings: listBookingsFunctionType
	createBooking: (props: createBookingPropTypes) => Promise<void>
}

export const defaultState: IBookingsContext = {
	bookings: undefined,
	listBookings: async () => Promise.resolve(),
	createBooking: async () => Promise.resolve(),
}