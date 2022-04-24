import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import DefaultLayout from "../src/components/layout/DefaultLayout/defaultLayout";

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <div>Hello</div>
    </DefaultLayout>
  );
};

export default Home;
