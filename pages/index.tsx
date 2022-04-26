import type { NextPage } from "next";
import { LayoutProvider } from "../src/providers/LayoutProvider";
import {Spinner} from "react-bootstrap"

const Home: NextPage = () => {
  return (
    <LayoutProvider>
      <Spinner animation="border" />
    </LayoutProvider>
  );
};

export default Home;
