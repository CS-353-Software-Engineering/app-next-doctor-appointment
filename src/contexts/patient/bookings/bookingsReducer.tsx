import {IBookingsContext} from './types'
import {StateAction} from "../../index";
import {BookingsActions} from './types/actions'


export default function BookingsReducer(state: IBookingsContext, action: StateAction): IBookingsContext {
	const {type, payload} = action


	switch (type) {
	case BookingsActions.LIST_BOOKINGS:
		// console.warn("IN REDUCER: ", payload)
		return {
			...state,
			bookings: payload?.items
		}
	case BookingsActions.UPDATE_BOOKING:
		// console.warn("IN REDUCER: ", payload)
		return {
			...state,
			bookings: payload
		}
	case BookingsActions.CREATE_BOOKING:
		// console.warn("IN REDUCER: ", payload)
		return {
			...state,
			bookings: payload
		}
	default:
		return state
	}

}