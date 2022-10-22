import {
  Container,
  Flex,
  Heading,
  HStack,
  useMediaQuery,
} from "@chakra-ui/react";
import NavButtons from "./buttons";

export default function Nav() {
  const [notLandscape] = useMediaQuery("(min-height: 480px)");

  return (
    <Flex pos="fixed" w="100%" top={0} p={4} zIndex={1}>
      <Container
        maxW="container.lg"
        p={{ base: 6, md: notLandscape ? 8 : 6 }}
        bgColor="white"
        rounded="lg"
        boxShadow="xs"
      >
        <HStack justify="space-between">
          <Heading size={{ base: "sm", md: "md" }}>Hot Discord Cards</Heading>
          <NavButtons />
        </HStack>
      </Container>
    </Flex>
  );
}
