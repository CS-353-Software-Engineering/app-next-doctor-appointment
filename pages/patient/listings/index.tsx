import * as React from "react";
import DefaultLayout from "../../../src/components/layout/DefaultLayout/defaultLayout";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

const index = [
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

export default function ListDoctors() {
  const router = useRouter();

  return (
    <DefaultLayout>
      <div>
        <Typography>List Of Doctors</Typography>
        <List
          dense
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {index?.map((doctor, idx) => {
            return (
              <div key={idx}>
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
                        <React.Fragment>
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
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </ListItemButton>

                <Divider variant="inset" component="li" />
              </div>
            );
          })}
        </List>
      </div>
    </DefaultLayout>
  );
}
