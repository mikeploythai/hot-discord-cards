import { Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";

export default function CardInfo({ cardData }) {
  return (
    <Flex direction="column" gap={4}>
      <Image
        src={cardData.image}
        alt={cardData.name}
        w="auto"
        h="200px"
        rounded="lg"
      />
      
      <VStack w="100%" align="start" gap={8}>
        <VStack align="start">
          <Heading>{cardData.name}</Heading>

          <Heading
            size={{ base: "sm", md: "md" }}
            fontWeight="medium"
            textTransform="capitalize"
          >
            {cardData.attribute}
          </Heading>
        </VStack>

        <Text>*stats*</Text>
      </VStack>
    </Flex>
  );
}
