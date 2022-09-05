import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { supabase } from "../utils/supabaseClient";
import { FaDiscord } from "react-icons/fa";
import { useState } from "react";

export default function Auth() {
  const [loaded, setLoaded] = useState(false);

  const handleLogin = async () => {
    try {
      setLoaded(false);
      const { error } = await supabase.auth.signIn({ provider: "discord" });

      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      setLoaded(true);
    }
  };

  return (
    <VStack gap={{ base: "32px", md: "64px" }}>
      <VStack textAlign="center" gap={{ base: "4px", md: "8px" }}>
        <Heading size={{ base: "2xl", md: "3xl" }}>Hot Discord Cards</Heading>

        <Text fontSize={{ base: "sm", md: "lg" }}>
          One of the trading card games of all time.
          <br></br>
          <b>NOT</b> affiliated with Discord.
        </Text>
      </VStack>

      <Button
        size={{ base: "md", md: "lg" }}
        colorScheme="purple"
        leftIcon={<FaDiscord />}
        onClick={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        isLoading={loaded}
      >
        <Text fontSize={{ base: "sm", md: "md" }}>Sign In with Discord</Text>
      </Button>
    </VStack>
  );
}
