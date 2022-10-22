import { Flex } from "@chakra-ui/react";
import Head from "next/head";

export default function Page({ title, children }) {
  return (
    <Flex minH="100vh" justify="center" p={4} bgColor="gray.100">
      <Head>
        <title>{title ? `${title} |` : null} Hot Discord Cards</title>
      </Head>

      {children}
    </Flex>
  );
}
