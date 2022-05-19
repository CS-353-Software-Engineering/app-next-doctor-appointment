import * as React from "react";
import {
  Avatar,
} from "@mui/material";
import { useRouter } from "next/router";
import { LayoutProvider } from "../../src/providers/LayoutProvider";
import { Button } from "@mui/material";
import { Table } from "react-bootstrap"
import { useContext, useEffect, useState, } from "react";
import DoctorsContext from "../../src/contexts/patient/doctors/doctorsContext";
import BookDoctorModal from "../../src/components/core/patient/bookDoctorModal";
import Doctor from "../../src/models/doctor/doctor.model";
import AuthContext from "../../src/contexts/shared/auth/authContext";
import { UserRole } from "../../src/constants/policies/access.control.policy";

export default function DoctorsList() {

  const { listDoctors, doctors } = useContext(DoctorsContext);

  const [isShowDoctorDetails, setIsShowDoctorDetails] = useState<boolean>(false)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user?.role == UserRole.PATIENT) {
      console.log("Getting Doctors")
      doctors === undefined && listDoctors()
        .then((doctors) => {
          console.log("Doctors Raw Data: ", doctors)
        })
        .catch((error) => {
          console.warn("Unable to fetch doctors list, ", error)
        })
    }
  }, [doctors, listDoctors, user])


  const router = useRouter();

  useEffect(() => {
    if (user?.role == UserRole.DOCTOR) {
      router.replace('/doctor');
    }
  }, [router, user])


  if (!user || user?.role == UserRole.DOCTOR) {
    return (<div></div>);
  }

  if (doctors === undefined || doctors?.length == 0) {
    return (<div></div>)
  }

  return (
    <LayoutProvider>
      <div>
        <h3 className="text-center">List Of Doctors</h3>

        <Table className="text-center fw-bold">
          <thead>
            <tr>
              <td></td>
              <td>Name</td>
              <td>Specialisation</td>
              <td>Bio</td>
              <td>Actions</td>
            </tr>
          </thead>

          <tbody>
            {
              doctors?.map((doctor, index) => {
                return (
                  <tr key={index} className="align-middle" >
                    <td><Avatar>{doctor?.fName[0] + doctor?.lName[0]}</Avatar></td>
                    <td>{`${doctor?.fName} ${doctor?.lName}`}</td>
                    <td>{doctor.speciality}</td>
                    <td>{doctor.bio}</td>
                    <td >
                      <Button
                        // onClick={() => { router.replace(`/patient/doctor-profile/${doctor.id}`) }}
                        onClick={() => {
                          setSelectedDoctor(doctor)
                          setIsShowDoctorDetails(true)
                        }}
                        variant="contained"
                        color="primary"
                        className="px-5"
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

        {/*Modals*/}
        <BookDoctorModal
          isShow={isShowDoctorDetails}
          onHide={() => { setIsShowDoctorDetails(false) }}
          doctor={selectedDoctor}
        />

      </div>

    </LayoutProvider>
  );
}
