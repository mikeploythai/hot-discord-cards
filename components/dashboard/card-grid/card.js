import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";

export default function Card() {
  return (
    <Box
      bgColor="white"
      maxW="200px"
      w="100%"
      h="300px"
      p="16px"
      rounded="lg"
      boxShadow="xs"
      transition=".25s ease-in-out"
      _hover={{ transform: "scale(1.05)" }}
    >
      <VStack w="100%" h="100%" gap="4px">
        <HStack w="100%" justify="space-between">
          <Heading size="sm">Test</Heading>
          <Text fontSize="xs">Attr</Text>
        </HStack>

        <Box bgColor="gray.100" w="100%" h="100%" rounded="md"></Box>
      </VStack>
    </Box>
  );
}
