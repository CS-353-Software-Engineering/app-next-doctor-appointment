import type { NextPage } from "next";
import { LayoutProvider } from "../src/providers/LayoutProvider";

const Home: NextPage = () => {
  return (
    <LayoutProvider>
      <div>Hello</div>
    </LayoutProvider>
  );
};

export default Home;
