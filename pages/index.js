import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import Head from "next/head";
import Admin from "./components/Admin";
import Complaint from "./components/Complaint";
import CreateComplain from "./components/CreateComplain";
import Header from "./components/Header";
import Status from "./components/Status";

export default function Home() {
  const address = useAddress();

  const { contract } = useContract(process.env.NEXT_PUBLIC_SMART_CONTRACT);
  const { data: officer } = useContractRead(contract, "officer");

  return (
    <div className="">
      <Head>
        <title>Complaint App</title>
        <meta name="description" content="This is a police complaint app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Complaint />
      <Status />
      <CreateComplain />
      {officer === address && <Admin />}
    </div>
  );
}
