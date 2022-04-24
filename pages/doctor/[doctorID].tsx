import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Typography,
  Avatar,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState, Fragment, useEffect } from "react";
import DefaultLayout from "../../src/components/layout/DefaultLayout/defaultLayout";

const DoctorProfile = () => {
  const router = useRouter();
  const { doctorID } = router.query;

  interface Doctor {
    id: number;
    name: string;
    speciality: string;
    image: string;
    desctiption: string;
  }

  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    const doctors: Doctor[] = [
      {
        id: 1,
        name: "John Doe",
        speciality: "Heart Specialist",
        image: "https://randomuser.me/api/portraits/men/69.jpg",
        desctiption: "Hello, I am a nice doctor",
      },
      {
        id: 2,
        name: "Hassan Abbasi",
        speciality: "Expert in Cardiology",
        image: "https://randomuser.me/api/portraits/men/74.jpg",
        desctiption: "Hello, I am a cool doctor",
      },
      {
        id: 3,
        name: "Ahmad Feroz",
        speciality: "Brain Surgeon",
        image: "https://randomuser.me/api/portraits/men/73.jpg",
        desctiption: "Hello, I am a good doctor",
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
              <ListItemButton
                onClick={() => {
                  router.push(`doctor/${doctor?.id}`);
                }}
              >
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
                        {doctor?.desctiption}
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
