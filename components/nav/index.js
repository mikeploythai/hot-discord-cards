import {
  Container,
  Flex,
  Heading,
  HStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";
import Link from "next/link";
import NavButtons from "./buttons";

export default function Nav() {
  const session = useSession();
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
          {!session ? (
            <Link href="/" passHref>
              <Heading size={{ base: "sm", md: "md" }} cursor="pointer">
                Hot Discord Cards
              </Heading>
            </Link>
          ) : (
            <Heading size={{ base: "sm", md: "md" }}>Hot Discord Cards</Heading>
          )}
          <NavButtons />
        </HStack>
      </Container>
    </Flex>
  );
}
