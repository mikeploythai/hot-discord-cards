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
    <Flex w="100%" h="fit-content" opacity={0}>
      <Container maxW="container.lg" p={["24px", "32px"]} bgColor="gray">
        <HStack justify="space-between">
          <Heading size={["sm", "md"]}>Just for spacing lol</Heading>

          <Button display={["none", "initial"]} size="sm">
            Hey 👋
          </Button>

          <IconButton display={["initial", "none"]} aria-label="empty-space" />
        </HStack>
      </Container>
    </Flex>
  );
}
