import {
  Button,
  Heading,
  Text,
  useBreakpointValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";
import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function Landing() {
  const [loading, isLoading] = useState(false);

  const toast = useToast();
  const toastPos = useBreakpointValue({ base: "bottom", md: "bottom-right" });
  const toastW = useBreakpointValue({ base: "100%", md: "320px" });
  const toastP = useBreakpointValue({ base: "0 16px 8px", md: "0 8px 8px" });

  async function handleLogin() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "discord",
      });
      if (error) throw error;
    } catch (error) {
      toast({
        title: "Error!",
        description: error.message,
        status: "error",
        position: toastPos,
        containerStyle: {
          w: toastW,
          p: toastP,
        },
        isClosable: true,
      });
    }
  }

  return (
    <VStack gap={{ base: "32px", md: "48px" }} zIndex={1}>
      <VStack textAlign="center" gap={{ base: "2px", md: "8px" }}>
        <Heading size={{ base: "xl", md: "3xl" }} maxW="2xl">
          One of the trading card games of all time.
        </Heading>

        <Text fontSize={{ base: "md", md: "xl" }}>
          A CPSC 362 Project by Mike &amp; Shaleen.
        </Text>
      </VStack>

      <Button
        leftIcon={<FaDiscord />}
        size={{ base: "md", md: "lg" }}
        colorScheme="purple"
        onClick={(e) => {
          isLoading(true);
          e.preventDefault();
          handleLogin();
        }}
        isLoading={loading}
      >
        Sign In with Discord
      </Button>
    </VStack>
  );
}
