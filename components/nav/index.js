import { Container, Flex, Heading, HStack } from "@chakra-ui/react";
import NavLinks from "./nav-links";

export default function Nav({ session }) {
  return (
    <Flex pos="fixed" top={0} w="100%" p="16px" zIndex={10}>
      <Container
        maxW="container.lg"
        p={{ base: "24px", md: "32px" }}
        bgColor="white"
        boxShadow="xs"
        rounded="lg"
      >
        <HStack justify="space-between">
          <Heading size={{ base: "sm", md: "md" }}>Hot Discord Cards</Heading>
          <NavLinks session={session} />
        </HStack>
      </Container>
    </Flex>
  );
}