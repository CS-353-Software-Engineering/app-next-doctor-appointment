import {StateProps} from "../../index";
import {useCallback, useReducer} from 'react'
import BookingsReducer from './bookingsReducer'
import {defaultState} from './types'
import {BookingsActions} from './types/actions'
import BookingsContext from "./bookingsContext";
import DB from '../../../services/data'
import {BookingDB} from "../../../services/data/models/booking.db.model";
import {Booking} from "../../../models/shared/booking.model";


export const BookingsState = ({children}:StateProps) => {
	const [state, dispatch] = useReducer(BookingsReducer, defaultState)


	const listBookings = useCallback(async () => {

		const data: any = await DB.listBookings()
		// console.warn("LIST DOCTORS: ", data)

		dispatch({
			type:BookingsActions.LIST_BOOKINGS,
			payload: {
				items: data?.map((item: BookingDB)=>new Booking(item)),
			}})
	},[])

	return <BookingsContext.Provider
		value={{
			...state,
			listBookings
	}}
	>
		{children}
	</BookingsContext.Provider>

}