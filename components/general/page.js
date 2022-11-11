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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      {children}
    </Flex>
  );
}
