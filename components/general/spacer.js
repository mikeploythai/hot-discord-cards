import { Button, Container, Flex, Heading, HStack } from "@chakra-ui/react";

export default function Spacer() {
  return (
    <Flex w="100%" h="fit-content" opacity={0}>
      <Container maxW="container.md" p={{ base: "24px", md: "32px" }}>
        <HStack justify="space-between">
          <Heading size={{ base: "sm", md: "md" }}>
            This is a spacer component
          </Heading>

          <Button size="sm">Hey :D</Button>
        </HStack>
      </Container>
    </Flex>
  );
}
