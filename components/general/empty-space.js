import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
} from "@chakra-ui/react";

export default function EmptySpace() {
  return (
    <Flex w="100%" h="fit-content">
      <Container maxW="container.lg" p={{ base: 6, md: 8 }}>
        <HStack justify="space-between">
          <Heading size={{ base: "sm", md: "md" }}>
            This is an empty space
          </Heading>
          <Button display={{ base: "none", md: "flex" }} size="sm">
            Hey 😄
          </Button>
          <IconButton display={{ base: "flex", md: "none" }} />
        </HStack>
      </Container>
    </Flex>
  );
}
