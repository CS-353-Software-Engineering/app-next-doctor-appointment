import {IDoctorsContext} from './types'
import {StateAction} from "../../index";
import {DoctorsActions} from './types/actions'


export default function DoctorsReducer(state: IDoctorsContext, action: StateAction): IDoctorsContext {
	const {type, payload} = action


	switch (type) {
	case DoctorsActions.LIST_DOCTORS:
		// console.warn("IN REDUCER: ", payload)
		return {
			...state,
			doctors: payload?.items
		}
	default:
		return state
	}

}