import {
  Avatar,
  Button,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function ProfileCard({ username, bio, pic, onOpen }) {
  return (
    <HStack
      p={["24px", "48px"]}
      bgColor="white"
      gap={["16px", "32px"]}
      boxShadow="xs"
      rounded="lg"
    >
      <Avatar size={["lg", "xl"]} src={pic} name={username} />

      <VStack w="100%" align="start" gap="8px">
        <VStack w="100%" align="start">
          <HStack w="100%" justify="space-between">
            <Heading size={["md", "lg"]}>{username}</Heading>

            <Button
              size={["xs", "sm"]}
              variant="outline"
              rounded="lg"
              onClick={onOpen}
            >
              Edit
            </Button>
          </HStack>

          <Text
            fontSize={["xs", "sm"]}
            wordBreak="break-word"
            whiteSpace="pre-wrap"
            noOfLines={5}
          >
            {bio}
          </Text>
        </VStack>

        <HStack display="none">
          <Text fontSize={["xs", "sm"]}>
            <b>98</b> Following
          </Text>

          <Text fontSize={["xs", "sm"]}>
            <b>1000</b> Followers
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
}
