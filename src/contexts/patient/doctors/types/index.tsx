import Doctor from "../../../../models/doctor/doctor.model";


type listDoctorsFunctionType = () => Promise<void>

export interface IDoctorsContext {
	doctors: Doctor[],
	listDoctors: listDoctorsFunctionType
}

export const defaultState: IDoctorsContext = {
	doctors: [],
	listDoctors: async () => Promise.resolve()
}