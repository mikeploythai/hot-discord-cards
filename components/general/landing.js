import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";
import { useState } from "react";

export default function Landing({ handleLogin }) {
  const [loading, isLoading] = useState(false);

  return (
    <VStack gap={{ base: "32px", md: "48px" }} zIndex={1}>
      <VStack textAlign="center" gap={{ base: "2px", md: "8px" }}>
        <Heading size={{ base: "xl", md: "3xl" }} maxW="2xl">
          One of the trading card games of all time
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
        Sign Up with Discord
      </Button>
    </VStack>
  );
}
