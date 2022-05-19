import DoctorDB from "../../services/data/models/doctor.db.model";

export default class Doctor {
  readonly id: string;
  readonly fName: string;
  readonly lName: string;
  readonly speciality: string | null;
  readonly image: string;
  readonly bio: string;

  constructor(doctorDB: DoctorDB) {
    this.id = doctorDB.id ?? ''
    this.bio = doctorDB.bio ?? ''
    this.fName = doctorDB.fName ?? ''
    this.lName = doctorDB.lName ?? ''
    this.speciality = doctorDB.speciality ?? "General Physician"
    this.image = doctorDB.image ?? `${this.fName[0]}${this.lName}` /* Doctor.getRandomInteger() */

    // console.warn("Ehh ", this)
  }

  private static getRandomInteger(): string {
    let number  = Math.floor((Math.random() * 100) + 1).toString()

    // console.warn(number)
    // console.warn(typeof number)
    return "https://randomuser.me/api/portraits/men/" + number + ".jpg"
  }
}