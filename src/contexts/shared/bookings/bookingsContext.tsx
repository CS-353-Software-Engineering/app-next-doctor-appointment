import {createContext} from 'react'
import {defaultState, IBookingsContext} from './types'

const BookingsContext = createContext<IBookingsContext>(defaultState)
export default BookingsContext
