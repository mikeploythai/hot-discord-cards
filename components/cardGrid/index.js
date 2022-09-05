import { Container, Heading, HStack, VStack } from "@chakra-ui/react";
import AddCard from "./addCard";
import Card from "./card";

export default function CardGrid() {
  return (
    <Container
      maxW="container.md"
      w="fit-content"
      h="fit-content"
      p={{ base: "24px", md: "48px" }}
      bgColor="white"
      boxShadow="xs"
    >
      <VStack gap={{ base: "16px", md: "32px" }}>
        <HStack w="100%" align="center" justify="space-between" gap="24px">
          <Heading size={{ base: "md", md: "lg" }}>Your Cards</Heading>
          <AddCard />
        </HStack>
        <Card />
      </VStack>
    </Container>
  );
}
