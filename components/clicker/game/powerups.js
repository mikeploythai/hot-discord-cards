import { Text, VStack } from "@chakra-ui/react";

export default function Powerups() {
  return (
    <VStack
      p={{ base: "24px", md: "48px" }}
      bgColor="white"
      boxShadow="xs"
      rounded="lg"
      gap={{ base: "16px", md: "32px" }}
    >
      <Text>Insert autoclick powerups here</Text>
    </VStack>
  );
}
