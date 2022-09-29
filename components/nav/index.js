import { Container, Flex, Heading, HStack } from "@chakra-ui/react";
import NavItems from "./nav-items";

export default function Nav({ session }) {
  return (
    <Flex pos="fixed" top={0} w="100%" p="16px" zIndex={1}>
      <Container
        maxW="container.lg"
        p={["24px", "32px"]}
        bgColor="white"
        boxShadow="xs"
        rounded="lg"
      >
        <HStack justify="space-between">
          <Heading size={["sm", "md"]}>Hot Discord Cards</Heading>
          <NavItems session={session} />
        </HStack>
      </Container>
    </Flex>
  );
}
