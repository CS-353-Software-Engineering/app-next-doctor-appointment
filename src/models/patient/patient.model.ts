interface PatientDetails {
	readonly id: string
	readonly fName: string
	readonly lName: string
	readonly email: string
	readonly photo: string
}

export default class Patient {
	readonly id: string = "";
	readonly fName: string;
	readonly lName: string;
	readonly email: string;
	readonly photo: string;

	constructor(data: PatientDetails) {
		this.id = data?.id;
		this.fName = data?.fName ?? "";
		this.lName = data?.lName ?? "";
		this.email = data?.email ?? "";
		this.photo = data?.photo ?? "";
	}
}
