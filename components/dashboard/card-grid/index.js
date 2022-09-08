import {
  Button,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import Card from "./card";

export default function CardGrid() {
  return (
    <Container maxW="container.md" p="0">
      <VStack
        p={{ base: "24px 24px 48px", md: "32px" }}
        bgColor="white"
        boxShadow="xs"
        rounded="lg"
        gap="20px"
      >
        <HStack w="100%" justify="space-between">
          <Heading size="md">Your Cards</Heading>
          {/* <Button size="sm">Add</Button> */}
        </HStack>

        <SimpleGrid
          w="100%"
          columns={[1, 2, 3]}
          spacing="32px"
          justifyItems={{ base: "center", md: "initial" }}
          m="0"
        >
          <Card />
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
