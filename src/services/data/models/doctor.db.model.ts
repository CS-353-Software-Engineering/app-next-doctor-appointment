export default class DoctorDB {
	readonly id: number;
	readonly fName: string;
	readonly lName: string;
	readonly speciality: string | null;
	readonly image: string | null;
	readonly bio: string;

	constructor(data: any) {
		// console.info("Creating new Doc Object: ", data)
		this.id = data?.id ?? ''
		this.fName = data?.fName ?? ''
		this.lName = data?.lName ?? ''
		this.speciality = data?.department?.name ?? null
		this.image = data?.profileImage ?? null
		this.bio = data?.bio ?? 'No bio added'

	}
}