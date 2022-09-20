import { ChakraProvider } from "@chakra-ui/react";

function HotDiscordCards({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default HotDiscordCards;
