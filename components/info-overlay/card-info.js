import {
  Flex,
  Heading,
  Image,
  Progress,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function CardInfo({ cardData }) {
  return (
    <Flex direction="column" gap={4}>
      <Skeleton w="auto" rounded="md" isLoaded={cardData}>
        <Image
          src={cardData.image}
          alt={cardData.name}
          w="100%"
          h="200px"
          rounded="md"
        />
      </Skeleton>

      <VStack w="100%" align="start" gap={8}>
        <VStack align="start">
          <Skeleton rounded="md" isLoaded={cardData}>
            <Heading textTransform="capitalize">{cardData.name}</Heading>
          </Skeleton>

          <Skeleton w="60%" rounded="md" isLoaded={cardData}>
            <Heading
              size={{ base: "xs", md: "sm" }}
              fontWeight="medium"
              textTransform="capitalize"
            >
              {cardData.level} | {cardData.attribute}
            </Heading>
          </Skeleton>
        </VStack>

        <VStack w="100%" align="start">
          <Heading size="sm">Card Stats</Heading>

          <SkeletonText w="100%" rounded="md" isLoaded={cardData}>
            <Stack>
              {cardData.stats ? (
                Object.entries(cardData.stats).map((stats) => {
                  return (
                    <>
                      <Text
                        fontSize="xs"
                        fontWeight="medium"
                        textTransform="capitalize"
                      >
                        {stats[0]} | {stats[1]}%
                      </Text>
                      <Progress
                        value={stats[1]}
                        colorScheme="purple"
                        bgColor="blackAlpha.300"
                        rounded="sm"
                      />
                    </>
                  );
                })
              ) : (
                <Text fontSize="xs">Stats unavailable.</Text>
              )}
            </Stack>
          </SkeletonText>
        </VStack>
      </VStack>
    </Flex>
  );
}
