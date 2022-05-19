import {createContext} from 'react'
import {defaultState, IDoctorsContext} from './types'

const DoctorsContext = createContext<IDoctorsContext>(defaultState)
export default DoctorsContext
