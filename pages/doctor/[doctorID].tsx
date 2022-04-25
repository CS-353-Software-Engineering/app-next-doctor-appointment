import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import DefaultLayout from "../../src/components/layout/DefaultLayout/defaultLayout";
import { Doctor } from "../../src/models/doctor/doctor.model";

const DoctorProfile = () => {
  const router = useRouter();
  const { doctorID } = router.query;

  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    const doctors: Doctor[] = [
      {
        id: 1,
        name: "John Doe",
        speciality: "Heart Specialist",
        image: "https://randomuser.me/api/portraits/men/69.jpg",
        bio: "Hello, I am a nice doctor",
      },
      {
        id: 2,
        name: "Hassan Abbasi",
        speciality: "Expert in Cardiology",
        image: "https://randomuser.me/api/portraits/men/74.jpg",
        bio: "Hello, I am a cool doctor",
      },
      {
        id: 3,
        name: "Ahmad Feroz",
        speciality: "Brain Surgeon",
        image: "https://randomuser.me/api/portraits/men/73.jpg",
        bio: "Hello, I am a good doctor",
      },
    ];

    const doctorsMap: Record<number, Doctor> = {
      1: doctors[0],
      2: doctors[1],
      3: doctors[2],
    };

    if (typeof doctorID == "string") {
      const id = parseInt(doctorID);
      setDoctor(doctorsMap[id]);
    }
  }, [doctorID]);

  return (
    <>
      <DefaultLayout>
        <div>
          {doctor && (
            <div>
              <Typography>Doctor Profile</Typography>
              <ListItemButton>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={doctor?.name} src={doctor?.image} />
                  </ListItemAvatar>

                  <ListItemText
                    primary={doctor?.name}
                    secondary={
                      <Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {doctor?.speciality}
                        </Typography>
                        <br />
                        {doctor?.bio}
                      </Fragment>
                    }
                  />
                </ListItem>
              </ListItemButton>
            </div>
          )}
        </div>
      </DefaultLayout>
    </>
  );
};

export default DoctorProfile;
