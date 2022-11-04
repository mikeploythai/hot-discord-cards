import {
  Avatar,
  Button,
  Container,
  Heading,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function ProfileCard({ userData, onOpen, display }) {
  return (
    <Container maxW="container.md" p={0}>
      <HStack
        p={{ base: 6, md: 12 }}
        gap={{ base: 2, sm: 4, md: 8 }}
        bgColor="white"
        boxShadow="xs"
        rounded="lg"
      >
        <SkeletonCircle h="100%" w="auto" isLoaded={userData}>
          <Avatar
            size={{ base: "md", sm: "lg", md: "xl" }}
            src={userData.picture}
            name={userData.username}
            boxShadow="xs"
          />
        </SkeletonCircle>

        <VStack w="100%" align="start" gap={2}>
          <VStack w="100%" align="start">
            <HStack w="100%" justify="space-between">
              <Skeleton rounded="md" isLoaded={userData}>
                <Heading
                  size={{ base: "sm", sm: "md", md: "lg" }}
                  noOfLines={1}
                  wordBreak="break-all"
                >
                  {userData.username}
                </Heading>
              </Skeleton>

              <Button
                display={display}
                size={{ base: "xs", md: "sm" }}
                variant="outline"
                onClick={onOpen}
              >
                Edit
              </Button>
            </HStack>

            <SkeletonText w="100%" rounded="md" isLoaded={userData}>
              <Text
                fontSize={{ base: "xs", md: "sm" }}
                wordBreak="break-word"
                whiteSpace="pre-wrap"
                noOfLines={5}
              >
                {userData.bio}
              </Text>
            </SkeletonText>
          </VStack>

          <HStack display="none">
            <Text fontSize={{ base: "xs", md: "sm" }}>
              <b>98</b> Following
            </Text>

            <Text fontSize={{ base: "xs", md: "sm" }}>
              <b>1000</b> Followers
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Container>
  );
}
