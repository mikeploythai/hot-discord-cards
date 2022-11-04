import { Flex } from "@chakra-ui/react";
import Head from "next/head";

export default function Page({ title, maxH, overflow, children }) {
  const fullTitle = `${title} | Hot Discord Cards`;

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
        <title>{title ? fullTitle : "Hot Discord Cards"}</title>
      </Head>

      {children}
    </Flex>
  );
}
