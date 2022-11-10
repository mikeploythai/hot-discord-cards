import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import Template from "./template";

export default function BuyCard() {
  return (
    <Template h="100%" justify="center">
      <Button
        colorScheme="purple"
        color="white"
        w="200px"
        h="300px"
        p="16px"
        rounded="lg"
        transition=".25s ease-in-out"
      >
        <VStack>
          <Heading size="md">Unlock a card!</Heading>
          <Text fontSize="sm">We know you want to.</Text>
        </VStack>
      </Button>
    </Template>
  );
}
