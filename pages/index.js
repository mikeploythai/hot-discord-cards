import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import Dashboard from "../components/dashboard";
import Landing from "../components/general/landing";

export default function HomePage({ session }) {
  return (
    <Flex minH="100vh" justify="center" p="16px" bgColor="gray.50">
      <Head>
        <title>
          {!session ? "Hot Discord Cards" : "Dashboard | Hot Discord Cards"}
        </title>
      </Head>

      {!session ? <Landing /> : <Dashboard session={session} />}
    </Flex>
  );
}
