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
      <Skeleton w="auto" rounded="lg" isLoaded={cardData}>
        <Image
          src={cardData.image}
          alt={cardData.name}
          w="100%"
          h="200px"
          rounded="lg"
        />
      </Skeleton>

      <VStack w="100%" align="start" gap={8}>
        <VStack align="start">
          <Skeleton rounded="lg" isLoaded={cardData}>
            <Heading textTransform="capitalize">{cardData.name}</Heading>
          </Skeleton>

          <Skeleton w="60%" rounded="lg" isLoaded={cardData}>
            <Heading
              size={{ base: "sm", md: "md" }}
              fontWeight="medium"
              textTransform="capitalize"
            >
              {cardData.attribute}
            </Heading>
          </Skeleton>
        </VStack>

        <VStack w="100%" align="start">
          <Heading size="sm">Card Stats</Heading>

          <SkeletonText w="100%" rounded="lg" isLoaded={cardData}>
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
                        bgColor="purple.100"
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
