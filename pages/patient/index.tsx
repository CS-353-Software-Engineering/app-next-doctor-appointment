import * as React from "react";
import {
  Avatar,
} from "@mui/material";
import { useRouter } from "next/router";
import { LayoutProvider } from "../../src/providers/LayoutProvider";
import { Button } from "@mui/material";
import { Table } from "react-bootstrap"
import {useContext, useEffect, useState, } from "react";
import DoctorsContext from "../../src/contexts/patient/doctors/doctorsContext";
import BookDoctorModal from "../../src/components/core/patient/bookDoctorModal";
import Doctor from "../../src/models/doctor/doctor.model";


export default function DoctorsList() {

  const router = useRouter();
  const { listDoctors, doctors} = useContext(DoctorsContext);

  const [isShowDoctorDetails, setIsShowDoctorDetails] = useState<boolean>(false)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)

  useEffect(() => {
    console.log("Getting Doctors")
    listDoctors()
        .then((doctors) => {
            console.log("Doctors Raw Data: ", doctors)
        })
        .catch((error) => {
          console.warn("Unable to fetch doctors list, ", error)
        })
  }, [])

  return (
    <LayoutProvider>
      <div>
        <h3 className="text-center">List Of Doctors</h3>

        <Table>
          <tbody>
            {
              doctors?.map((doctor, index) => {
                return (
                  <tr key={index} className="align-middle" >
                    <td><Avatar alt={doctor?.fName} src={doctor?.image ?? 'https://randomuser.me/api/portraits/men/73.jpg'} /></td>
                    <td>
                      <p className="fs-5 mb-0"><span className="fw-medium">
                        {`${doctor?.fName} ${doctor?.lName}`}</span> | {doctor.speciality}
                      </p>
                      <p>{doctor?.bio}</p>
                    </td>
                    <td >
                      <Button
                        // onClick={() => { router.replace(`/patient/doctor-profile/${doctor.id}`) }}
                        onClick={() => {
                          setSelectedDoctor(doctor)
                          setIsShowDoctorDetails(true)
                        }}
                        fullWidth
                        variant="contained"
                        color="primary"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </div>

      {/*Modals*/}
      <BookDoctorModal
          isShow={isShowDoctorDetails}
          onHide={() => { setIsShowDoctorDetails(false) }}
          doctor={selectedDoctor}
      />
    </LayoutProvider>
  );
}
