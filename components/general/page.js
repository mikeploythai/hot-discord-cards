import { Flex } from "@chakra-ui/react";
import Head from "next/head";

export default function Page({ title, maxH, overflow, children }) {
  return (
    <Flex
      minH="100vh"
      maxH={maxH}
      justify="center"
      p={4}
      bgColor="gray.100"
      overflow={overflow}
    >
      <Head>
        <title>{title ? `${title} |` : null} Hot Discord Cards</title>
      </Head>

      {children}
    </Flex>
  );
}
