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
import { supabase } from "../../utils/supabase-client";
import { FaDiscord } from "react-icons/fa";

export default function Landing() {
  const [loading, isLoading] = useState(false);

  const toast = useToast();
  const toastPos = useBreakpointValue(["bottom", "bottom-right"]);
  const toastW = useBreakpointValue(["100%", "320px"]);
  const toastP = useBreakpointValue(["0 16px 8px", "0 8px 8px"]);

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
    <Center m={0} p={0}>
      <VStack gap={["32px", "48px"]}>
        <VStack textAlign="center" maxW="2xl" gap={["2px", "8px"]}>
          <Heading size={["xl", "3xl"]}>
            One of the trading card games of all time.
          </Heading>

          <Text fontSize={["md", "xl"]} fontWeight="medium">
            A CPSC 362 Project by Mike &amp; Shaleen.
          </Text>
        </VStack>

        <Button
          leftIcon={<FaDiscord />}
          size={["md", "lg"]}
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
