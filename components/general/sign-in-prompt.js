import {
  Container,
  Flex,
  Heading,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import SignInButton from "./sign-in-button";

export default function SignInPrompt() {
  const [notLandscape] = useMediaQuery("(min-height: 480px)");

  return (
    <Flex
      pos="fixed"
      h="100vh"
      w="100%"
      align="end"
      bgGradient={
        notLandscape
          ? "linear(to-b, whiteAlpha.100 25%, white 85%)"
          : "linear(to-b, whiteAlpha.100 25%, white 75%)"
      }
      top={0}
      p={4}
      zIndex={1}
    >
      <Container maxW="container.lg" p={{ base: 2, md: notLandscape ? 4 : 2 }}>
        <VStack gap={{ base: 1, md: notLandscape ? 2 : 1 }}>
          <Heading size={{ base: "xs", md: "sm" }}>
            Sign in to view this user&apos;s full profile!
          </Heading>
          <SignInButton small="xs" large="sm" />
        </VStack>
      </Container>
    </Flex>
  );
}
