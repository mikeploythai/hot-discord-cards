import {
  Center,
  Container,
  Heading,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";

export default function CardGrid({ word, children }) {
  return (
    <Container maxW="container.md" p="0" onClick={() => console.log(children)}>
      <VStack
        h="100%"
        p={{ base: 6, md: 12 }}
        bgColor="white"
        boxShadow="xs"
        rounded="lg"
        gap={{ base: 2, md: 4 }}
      >
        <Heading size={{ base: "sm", md: "md" }} w="100%" alignItems="start">
          {word} Collection
        </Heading>

        {children.length === 0 ? (
          <Center h="100%">
            <Heading size={{ base: "xs", md: "sm" }}>
              There&apos;s no cards :/
            </Heading>
          </Center>
        ) : (
          <SimpleGrid
            w="100%"
            m={0}
            columns={{ base: 2, sm: 3 }}
            spacing={{ base: 4, md: 8 }}
            justifyItems={{ base: "center", md: "initial" }}
          >
            {children}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
}
