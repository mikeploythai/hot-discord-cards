import { Container, Heading, SimpleGrid, VStack } from "@chakra-ui/react";

export default function CardGrid({ word, children }) {
  return (
    <Container maxW="container.md" p="0">
      <VStack
        p={{ base: 6, md: 12 }}
        bgColor="white"
        boxShadow="xs"
        rounded="lg"
        gap={{ base: 2, md: 4 }}
      >
        <Heading size={{ base: "sm", md: "md" }} w="100%" alignItems="start">
          {word} Collection
        </Heading>

        <SimpleGrid
          w="100%"
          m={0}
          columns={{ base: 2, sm: 3 }}
          spacing={{ base: "16px", md: "32px" }}
          justifyItems={{ base: "center", md: "initial" }}
        >
          {children}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
