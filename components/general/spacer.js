import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
} from "@chakra-ui/react";

export default function Spacer() {
  return (
    <Flex w="100%" h="fit-content" opacity={0}>
      <Container
        maxW="container.lg"
        bgColor="gray"
        p={{ base: "24px", md: "32px" }}
      >
        <HStack justify="space-between">
          <Heading size={{ base: "sm", md: "md" }}>
            This is a spacer component
          </Heading>

          <Button display={{ base: "none", md: "initial" }} size="sm">
            Hey :D
          </Button>

          <IconButton
            display={{ base: "initial", md: "none" }}
            aria-label="spacer"
          />
        </HStack>
      </Container>
    </Flex>
  );
}
