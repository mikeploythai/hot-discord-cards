import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  useMediaQuery,
} from "@chakra-ui/react";

export default function EmptySpace() {
  const [notLandscape] = useMediaQuery("(min-height: 480px)");
  return (
    <Flex w="100%" h="fit-content" opacity={0}>
      <Container maxW="container.lg" p={{ base: 6, md: notLandscape ? 8 : 6 }}>
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
