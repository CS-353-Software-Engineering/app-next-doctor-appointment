import {
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";

import { Modal, Image, Table, } from 'react-bootstrap'

import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Doctor from "../../../../models/doctor/doctor.model";

const DoctorProfile = (props: {isShow: boolean, onHide: (() => void), doctor: Doctor | null}) => {
	const doctorID = props?.doctor?.id ?? '';
	const {doctor} = props;

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
				<Modal.Body className="d-flex flex-row justify-content-center">
					<h1>Kebablar</h1>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default DoctorProfile;
