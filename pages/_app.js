import { ChakraProvider } from "@chakra-ui/react";
import "../utils/globals.css";

function HotDiscordCards({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default HotDiscordCards;
