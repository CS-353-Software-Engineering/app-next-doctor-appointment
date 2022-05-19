import * as React from "react";
import {useContext, useEffect, useState} from "react";

import {LayoutProvider} from "../../../src/providers/LayoutProvider";
import {Button, Table} from "react-bootstrap"
import BookingsContext from "../../../src/contexts/shared/bookings/bookingsContext";
import {BookingStatus} from "../../../src/constants/bookings/booking.state";
import AuthContext from "../../../src/contexts/shared/auth/authContext";
import NotificationContext from "../../../src/contexts/shared/notifications/notificationsContext";
import {NotificationType} from "../../../src/contexts/shared/notifications/types";


export default function PatientBookings() {
    const {listBookings, bookings, updateBooking} = useContext(BookingsContext)
    const {user} = useContext(AuthContext)
    const {sendNotification, showError} = useContext(NotificationContext)

    const [isLoading, setIsLoading] = useState<boolean>(false)


  useEffect(() => {
    console.log("Getting Bookings")
      bookings === undefined && listBookings()
        .then((bookings) => {
            console.log("bookings Raw Data: ", bookings)
        })
        .catch((error) => {
          console.warn("Unable to fetch bookings list, ", error)
        })
  }, [bookings, listBookings])

    const acceptBooking = async (bookingID: string) => {
        setIsLoading(true)
        updateBooking({bookingID, status: BookingStatus.CONFIRMED})
            .then(() => {
                sendNotification({"message": "Booking Confirmed!", type: NotificationType.SUCCESS})
            })
            .catch((error) => {
                showError("Unable to accept booking :(")
                console.warn(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }


    const rejectBooking = async (bookingID: string) => {
        setIsLoading(true)
        updateBooking({bookingID, status: BookingStatus.CANCELLED})
            .then(() => {
                sendNotification({"message": "Booking Rejected!", type: NotificationType.SUCCESS})
            })
            .catch((error) => {
                showError("Unable to reject booking :(")
                console.warn(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const completeBooking = async (bookingID: string) => {
        setIsLoading(true)
        updateBooking({bookingID, status: BookingStatus.COMPLETED})
            .then(() => {
                sendNotification({"message": "Booking Completed!", type: NotificationType.SUCCESS})
            })
            .catch((error) => {
                showError("Unable to complete booking :(")
                console.warn(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

  return (
    <LayoutProvider>
      <div>
        <h3 className="text-center">My Bookings</h3>

        <Table className="text-center">
                <thead className="fw-bold">
                <td>Booking ID</td>
                <td>Patient Name</td>
                <td>Appointment Date</td>
                <td>Status</td>
                <td>Actions</td>
                </thead>
                <tbody>
                {
                    bookings?.filter((booking) => booking?.doctorID === user?.id).map((booking, index) => {
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
                                <td>


                                    {
                                        booking?.status === BookingStatus.PENDING && (
                                            <>
                                                <Button
                                                    className="px-5 me-3"
                                                    variant="success"
                                                    disabled={isLoading}
                                                    onClick={() => {
                                                        acceptBooking(booking?.id).finally()
                                                    }}
                                                >Accept</Button>
                                                <Button
                                                    className="px-5"
                                                    variant="danger"
                                                    disabled={isLoading}
                                                    onClick={() => {
                                                        rejectBooking(booking?.id).finally()
                                                    }}
                                                >Reject</Button>
                                            </>
                                        )
                                    }
                                    {/*{*/}
                                    {/*    booking?.status === BookingStatus.CONFIRMED && (*/}
                                    {/*        <>*/}
                                    {/*            <Button*/}
                                    {/*                className="px-5 text-white"*/}
                                    {/*                variant="warning"*/}
                                    {/*                disabled={isLoading}*/}
                                    {/*                onClick={() => {*/}
                                    {/*                    completeBooking(booking?.id).finally()*/}
                                    {/*                }}*/}
                                    {/*            >Complete</Button>*/}
                                    {/*        </>*/}
                                    {/*    )*/}
                                    {/*}*/}
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
