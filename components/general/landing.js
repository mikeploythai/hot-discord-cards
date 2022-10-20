import {
  Button,
  Center,
  Heading,
  Text,
  useBreakpointValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaDiscord } from "react-icons/fa";
import { supabase } from "../../utils/supabase-client";

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
    <Center pt={{ base: 32, md: 36 }} pb={{ base: 32, md: 36 }}>
      <VStack gap={{ base: 8, md: 12 }}>
        <VStack textAlign="center" maxW="2xl" gap={{ base: 0.5, md: 2 }}>
          <Heading size={{ base: "xl", md: "3xl" }}>
            One of the trading card games of all time.
          </Heading>
          <Text fontSize={{ base: "md", md: "xl" }} fontWeight="medium">
            A CPSC 362 Project by Mike &amp; Shaleen.
          </Text>
        </VStack>
        <Button
          leftIcon={<FaDiscord />}
          size={{ base: "md", md: "lg" }}
          colorScheme="purple"
          rounded="lg"
          onClick={() => {
            isLoading(true);
            handleLogin();
          }}
          isLoading={loading}
        >
          Sign In with Discord
        </Button>
      </VStack>
    </Center>
  );
}
