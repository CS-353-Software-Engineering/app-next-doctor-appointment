import {Button, Col, Form, Modal, Row, Spinner,} from 'react-bootstrap'
import {Controller, useForm} from 'react-hook-form'

import * as React from "react";
import {useCallback, useContext, useEffect, useState} from "react";
import Doctor from "../../../../models/doctor/doctor.model";
import {Avatar} from "@mui/material";
import AuthContext from "../../../../contexts/shared/auth/authContext";
import BookingsContext from "../../../../contexts/shared/bookings/bookingsContext";
import NotificationContext from "../../../../contexts/shared/notifications/notificationsContext";
import {NotificationType} from "../../../../contexts/shared/notifications/types";

const DoctorProfile = (props: {isShow: boolean, onHide: (() => void), doctor: Doctor | null}) => {
	const {doctor} = props;
	const {user} = useContext(AuthContext)
	const {createBooking} = useContext(BookingsContext)
	const {sendNotification, showError} = useContext(NotificationContext)


	const [isBooking, setIsBooking] = useState<boolean>(false)

	const userID = user?.id ?? '';
	const doctorID = doctor?.id ?? '';

	const {
		control,
		handleSubmit,
		setValue,
		reset,
		formState: {errors, isSubmitted},
	} = useForm()

	useEffect(() => {
		setValue('appointmentDateTime', null)
		setIsBooking(false)
	}, [setValue])

	const onSubmit = useCallback((data: any) => {
		console.warn('BOI IS BOOKINGGG: ', data)
		console.warn('BOI IS BOOKINGGG: ', typeof data?.appointmentDateTime)
		setIsBooking(true)

		createBooking({
			bookingDateTime: data?.appointmentDateTime ?? '',
			doctorBookingDoctorId: doctorID,
			doctorBookingPatientId: userID
		})
			.then(() => {
				sendNotification({message: "Appointment booked!", type: NotificationType.SUCCESS})
				reset({appointmentDateTime: null})
				props.onHide()
			})
			.catch((error) => {
				console.warn(error)
				showError("There was an error booking your appointment")
			})
			.finally(() => {
				setIsBooking(false)
			})
	}, [createBooking, doctorID, props, reset, sendNotification, showError, userID])

	return (
		<>
			<Modal
				size="xl"
				centered
				keyboard
				scrollable
				animation={false}
				show={props?.isShow}
				onHide={props?.onHide}
			>
				<Modal.Header className="d-flex align-items-center" closeButton>
					<Modal.Title>
						{`${doctor?.fName ?? 'Rashid'} ${doctor?.lName ?? 'Naseer'} | ${doctor?.speciality ?? 'General Physician'}`}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body >
					<Row>
						<Col>
							<Avatar
								className="mb-3"
								alt={doctor?.fName}
								src={doctor?.image ?? 'https://randomuser.me/api/portraits/men/73.jpg'}
							/>
							<h2 className="mb-2">{`${doctor?.fName ?? 'Rashid'} ${doctor?.lName ?? 'Naseer'}`}</h2>
							<h4 className="mb-5">Specialisation: <span className="fw-normal">{doctor?.speciality ?? 'General Physician'}</span></h4>
							<h3>About</h3>
							<p>{doctor?.bio}</p>
						</Col>
						<Col>
							<Form
								onSubmit={handleSubmit(onSubmit, (errors) => {
									console.log('Error submitting form: ', errors)
								})}
								// validated={isSubmitted}
								className="text-end"
							>
								<Form.Group>
									<Form.Label>Book an Appointment</Form.Label>
									<Controller
										render={({field}) => (
											<Form.Control
												// required
												type="datetime-local"
												{...field}
												isInvalid={!!errors.name}
												placeholder="What would you like to call this Board?"
											/>
										)}
										name="appointmentDateTime"
										defaultValue=""
										control={control}
										rules={{
											required:
												'Please select a date and time for your appointment',
										}}
									/>
								</Form.Group>

								<Button
									type="submit"
									size="sm"
									variant="primary"
									className="rounded-button mt-3 px-5 py-2"
									disabled={isBooking}
								>
									{isBooking && (
										<>
											<Spinner animation="border" size="sm"/>
											&nbsp;
											&nbsp;
										</>
									)}
									Submit
								</Button>
							</Form>
						</Col>
					</Row>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default DoctorProfile;
