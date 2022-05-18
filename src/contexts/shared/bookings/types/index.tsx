import {Booking} from "../../../../models/shared/booking.model";

type listBookingsFunctionType = () => Promise<void>

export interface IBookingsContext {
	bookings: Booking[],
	listBookings: listBookingsFunctionType
}

export const defaultState: IBookingsContext = {
	bookings: [],
	listBookings: async () => Promise.resolve()
}