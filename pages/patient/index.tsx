import * as React from "react";
import {
  Avatar,
} from "@mui/material";
import { useRouter } from "next/router";
import { LayoutProvider } from "../../src/providers/LayoutProvider";

import {Table, Button } from "react-bootstrap"

const doctors = [
  {
    id: 1,
    name: "John Doe",
    speciality: "Heart Specialist",
    image: "https://randomuser.me/api/portraits/men/69.jpg",
    description: "Hello, I am a nice doctor",
  },
  {
    id: 2,
    name: "Hassan Abbasi",
    speciality: "Expert in Cardiology",
    image: "https://randomuser.me/api/portraits/men/74.jpg",
    description: "Hello, I am a cool doctor",
  },
  {
    id: 3,
    name: "Ahmad Feroz",
    speciality: "Brain Surgeon",
    image: "https://randomuser.me/api/portraits/men/73.jpg",
    description: "Hello, I am a good doctor",
  },
  {
    id: 3,
    name: "Ahmad Feroz",
    speciality: "Brain Surgeon",
    image: "https://randomuser.me/api/portraits/men/73.jpg",
    description: "Hello, I am a good doctor",
  },
  {
    id: 3,
    name: "Ahmad Feroz",
    speciality: "Brain Surgeon",
    image: "https://randomuser.me/api/portraits/men/73.jpg",
    description: "Hello, I am a good doctor",
  },
  {
    id: 3,
    name: "Ahmad Feroz",
    speciality: "Brain Surgeon",
    image: "https://randomuser.me/api/portraits/men/73.jpg",
    description: "Hello, I am a good doctor",
  },
  {
    id: 3,
    name: "Ahmad Feroz",
    speciality: "Brain Surgeon",
    image: "https://randomuser.me/api/portraits/men/73.jpg",
    description: "Hello, I am a good doctor",
  },
];

export default function DoctorsList() {
  const router = useRouter();

  return (
    <LayoutProvider>
      <div>
        <h3 className="text-center">List Of Doctors</h3>

        <Table>
          <tbody>
          {
            doctors?.map((doctor, index) => {
              return (
                  <tr key={index}>
                    <td><Avatar alt={doctor?.name} src={doctor?.image} /></td>
                    <td>
                      <p className="fs-5 mb-0"><span className="fw-medium">{doctor?.name}</span> | {doctor.speciality}</p>
                      <p>{doctor?.description}</p>
                    </td>
                    <td>
                      <Button variant="primary" className="w-100">View</Button>
                    </td>
                  </tr>
              )
            })
          }
          </tbody>
        </Table>
      </div>
    </LayoutProvider>
  );
}
