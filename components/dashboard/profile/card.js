import {
  Avatar,
  Button,
  Heading,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function ProfileCard({ userData, onOpen }) {
  return (
    <HStack
      p={{ base: 6, md: 12 }}
      gap={{ base: 4, md: 8 }}
      bgColor="white"
      boxShadow="xs"
      rounded="lg"
    >
      <SkeletonCircle h="100%" w="auto" isLoaded={userData}>
        <Avatar
          size={{ base: "lg", md: "xl" }}
          src={!userData ? null : userData.picture}
          name={!userData ? null : userData.username}
          boxShadow="xs"
        />
      </SkeletonCircle>
      <VStack w="100%" align="start" gap={2}>
        <VStack w="100%" align="start">
          <HStack w="100%" justify="space-between">
            <Skeleton isLoaded={userData}>
              <Heading size={{ base: "md", md: "lg" }}>
                {!userData ? null : userData.username}
              </Heading>
            </Skeleton>
            <Button
              size={{ base: "xs", md: "sm" }}
              variant="outline"
              rounded="lg"
              onClick={onOpen}
            >
              Edit
            </Button>
          </HStack>
          <SkeletonText w="100%" isLoaded={userData}>
            <Text
              fontSize={{ base: "xs", md: "sm" }}
              wordBreak="break-word"
              whiteSpace="pre-wrap"
              noOfLines={5}
            >
              {!userData ? null : userData.bio}
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
  );
}
