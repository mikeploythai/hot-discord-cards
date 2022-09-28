import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Clicker from "../components/clicker";

export default function ClickerPage({ session }) {
  const route = useRouter();

  useEffect(() => {
    if (!session) route.push("/");
  }, [session]);

  return (
    <Flex minH="100vh" justify="center" p="16px" bgColor="gray.50">
      <Head>
        <title>Clicker | Hot Discord Cards</title>
      </Head>

      {!session ? null : <Clicker session={session} />}
    </Flex>
  );
}
