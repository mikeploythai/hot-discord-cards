import { Container, Flex, Heading, HStack } from "@chakra-ui/react";

export default function Nav({ children }) {
  return (
    <Flex pos="fixed" w="100%" top={0} p={4} zIndex={1}>
      <Container
        maxW="container.lg"
        p={{ base: 6, md: 8 }}
        bgColor="white"
        rounded="lg"
        boxShadow="xs"
      >
        <HStack justify="space-between">
          <Heading size={{ base: "sm", md: "md" }}>Hot Discord Cards</Heading>
          {children}
        </HStack>
      </Container>
    </Flex>
  );
}
