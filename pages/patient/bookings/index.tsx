import * as React from "react";
import {useContext, useEffect} from "react";

import {LayoutProvider} from "../../../src/providers/LayoutProvider";
import {Container, Table} from "react-bootstrap"
import BookingsContext from "../../../src/contexts/shared/bookings/bookingsContext";
import {BookingStatus} from "../../../src/constants/bookings/booking.state";


export default function PatientBookings() {
    const {listBookings, bookings} = useContext(BookingsContext)


  useEffect(() => {
    console.log("Getting Bookings")
      bookings === undefined && listBookings()
        .then((bookings) => {
            console.log("bookings Raw Data: ", bookings)
        })
        .catch((error) => {
          console.warn("Unable to fetch bookings list, ", error)
        })
  }, [listBookings])

  return (
    <LayoutProvider>
      <div>
        <h3 className="text-center">My Bookings</h3>

        <Table className="text-center">
            <thead className="fw-medium">
            <td>Booking ID</td>
            <td>Patient Name</td>
            <td>Appointment Date</td>
            <td>Status</td>
            </thead>
            <tbody>
            {
              bookings?.map((booking, index) => {
                return (
                  <tr key={index} className="align-middle" >
                    <td>{booking?.id}</td>
                      <td>{`${booking.patient.fName} ${booking.patient.lName}`}</td>
                      <td>{booking.bookedOn}</td>
                      <td
                          className={
                            booking.status === BookingStatus.PENDING ? 'text-warning' :
                                booking.status === BookingStatus.CANCELLED ? 'text-danger' : 'text-success'
                      }
                      >{booking.status}</td>
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
