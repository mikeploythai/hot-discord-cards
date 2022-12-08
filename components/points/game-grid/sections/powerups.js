import {
  Flex,
  Heading,
  HStack,
  IconButton,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { FaDice, FaHandPeace, FaMagic } from "react-icons/fa";
import Template from "./template";

export default function PowerUps({ userData }) {
  return (
    <Template>
      <Flex
        direction={{ base: "column", sm: "row" }}
        w="100%"
        align="center"
        justify="space-between"
        gap={4}
      >
        <Flex
          direction={{ base: "row", sm: "column" }}
          w="100%"
          align={{ base: "center", sm: "start" }}
          justify="space-between"
        >
          <Heading size="md">Power Ups</Heading>

          <Skeleton rounded="md" noOfLines={1} isLoaded={userData}>
            <Text fontSize={{ base: "sm", sm: "xs" }}>
              <b>{userData.points}</b> Dabloons
            </Text>
          </Skeleton>
        </Flex>

        <HStack
          w={{ base: "100%", sm: "unset" }}
          justify="space-between"
          gap={{ base: 0, sm: 4 }}
        >
          <IconButton icon={<FaHandPeace />} disabled />
          <IconButton icon={<FaMagic />} disabled />
          <IconButton icon={<FaDice />} disabled />
        </HStack>
      </Flex>
    </Template>
  );
}
