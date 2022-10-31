import {
  Container,
  Flex,
  Heading,
  HStack,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import NavButtons from "./buttons";

export default function Nav() {
  const [notLandscape] = useMediaQuery("(min-height: 480px)");

  return (
    <Flex pos="fixed" w="100%" top={0} p={4} zIndex={2}>
      <Container
        maxW="container.lg"
        p={{ base: 6, md: notLandscape ? 8 : 6 }}
        bgColor="white"
        rounded="lg"
        boxShadow="xs"
      >
        <HStack justify="space-between">
          <Link href="/" passHref>
            <Heading
              size={{ base: "sm", md: "md" }}
              _hover={{ cursor: "pointer" }}
            >
              Hot Discord Cards
            </Heading>
          </Link>
          <NavButtons />
        </HStack>
      </Container>
    </Flex>
  );
}
