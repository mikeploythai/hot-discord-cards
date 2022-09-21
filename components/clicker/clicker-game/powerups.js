import { Container, Text, VStack } from "@chakra-ui/react";

export default function Powerups() {
  return (
    <Container maxW="container.md" p={0}>
      <VStack
        p={{ base: "24px", md: "48px" }}
        bgColor="white"
        boxShadow="xs"
        rounded="lg"
        gap={{ base: "16px", md: "32px" }}
      >
        <Text>Insert autoclick powerups here</Text>
      </VStack>
    </Container>
  );
}
