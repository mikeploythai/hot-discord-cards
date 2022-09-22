import { Text, VStack } from "@chakra-ui/react";

export default function Leaderboard() {
  return (
    <VStack
      h="100%"
      p={{ base: "24px", md: "48px" }}
      bgColor="white"
      boxShadow="xs"
      rounded="lg"
      gap={{ base: "16px", md: "32px" }}
    >
      <Text>Insert leaderboard here</Text>
    </VStack>
  );
}
