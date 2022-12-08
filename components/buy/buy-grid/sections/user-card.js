import {
  Avatar,
  Heading,
  HStack,
  Skeleton,
  SkeletonCircle,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import Template from "./template";

export default function UserCard({ data, link }) {
  const [breakpoint] = useMediaQuery("(max-width: 360px)");

  return (
    <Template user={true}>
      <HStack
        as={Link}
        w="100%"
        justify="space-between"
        p={{ base: 3, md: 4 }}
        rounded="md"
        transition="200ms ease-in-out"
        href={link}
        _hover={{ bgColor: "gray.100" }}
      >
        <SkeletonCircle h="100%" w="auto" isLoaded={data}>
          <Avatar
            src={data.picture}
            name={data.username}
            size={breakpoint ? "sm" : "md"}
            boxShadow="xs"
          />
        </SkeletonCircle>

        <VStack textAlign="end" align="end">
          <Skeleton rounded="md" isLoaded={data}>
            <Heading size="sm" noOfLines={1} wordBreak="break-all">
              {data.username}
            </Heading>
          </Skeleton>

          <Skeleton rounded="md" noOfLines={1} isLoaded={data}>
            <Text fontSize="xs">
              <b>{data.points}</b> Dabloons Available
            </Text>
          </Skeleton>
        </VStack>
      </HStack>
    </Template>
  );
}
