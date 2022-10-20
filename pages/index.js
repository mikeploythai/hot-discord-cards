import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import Dashboard from "../components/dashboard";
import Landing from "../components/general/landing";

export default function Home({ session }) {
  return (
    <Flex minH="100vh" justify="center" p={4} bgColor="gray.100">
      <Head>
        <title>Hot Discord Cards {!session ? null : "| Dashboard"}</title>
      </Head>
      {!session ? <Landing /> : <Dashboard session={session} />}
    </Flex>
  );
}
