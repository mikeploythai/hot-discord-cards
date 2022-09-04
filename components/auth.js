import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { supabase } from "../utils/supabaseClient";
import { FaDiscord } from "react-icons/fa";

export default function Auth() {
  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signIn({ provider: "discord" });
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <VStack gap="64px">
      <VStack gap="8px">
        <Heading size="3xl">Hot Discord Cards</Heading>
        <Text fontSize="lg">One of the trading card games of all time.</Text>
      </VStack>

      <Button
        size="lg"
        colorScheme="purple"
        leftIcon={<FaDiscord />}
        onClick={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <Text fontSize="md">Sign In with Discord</Text>
      </Button>
    </VStack>
  );
}
