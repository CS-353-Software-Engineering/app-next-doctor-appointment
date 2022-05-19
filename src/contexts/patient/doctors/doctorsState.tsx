import {StateProps} from "../../index";
import {useCallback, useReducer} from 'react'
import DoctorsReducer from './doctorsReducer'
import {defaultState} from './types'
import {DoctorsActions} from './types/actions'
import Doctor from "../../../models/doctor/doctor.model";
import DoctorsContext from "./doctorsContext";
import DoctorDB from "../../../services/data/models/doctor.db.model";
import DB from '../../../services/data'


export const DoctorsState = ({children}:StateProps) => {
	const [state, dispatch] = useReducer(DoctorsReducer, defaultState)


	const listDoctors = useCallback(async () => {

		const data: any = await DB.listDoctors()
		// console.warn("LIST DOCTORS: ", data)

		dispatch({
			type:DoctorsActions.LIST_DOCTORS,
			payload: {
				items: data?.map((item: DoctorDB)=>new Doctor(item)),
			}})
	},[])

	return <DoctorsContext.Provider
		value={{
			...state,
			listDoctors
	}}
	>
		{children}
	</DoctorsContext.Provider>

}