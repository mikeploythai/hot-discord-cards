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
import Template from "./template";

export default function Unlocks() {
  const [notLandscape] = useMediaQuery("(min-height: 480px)");
  const [foldLandscape] = useMediaQuery("(max-height: 280px)");

  function TempArea() {
    const [breakpoint] = useMediaQuery("(max-width: 360px)");

    return (
      <HStack
        w="100%"
        justify="space-between"
        p={{ base: 3, md: 4 }}
        rounded="md"
        transition="200ms ease-in-out"
        _hover={{ bgColor: "gray.100" }}
      >
        <SkeletonCircle h="100%" w="auto">
          <Avatar size={breakpoint ? "sm" : "md"} boxShadow="xs" />
        </SkeletonCircle>

        <VStack textAlign="end" align="end">
          <Skeleton rounded="md">
            <Heading size="sm" noOfLines={1} wordBreak="break-all">
              Temp Line
            </Heading>
          </Skeleton>

          <Skeleton rounded="md" noOfLines={1}>
            <Text fontSize="xs">Temp Line</Text>
          </Skeleton>
        </VStack>
      </HStack>
    );
  }

  return (
    <Template
      h="100%"
      maxH={{
        base: "50vh",
        sm: notLandscape ? "unset" : foldLandscape ? "100vh" : "80vh",
      }}
      user={true}
    >
      <Heading size="sm" p="1rem 0">
        Recent Unlocks
      </Heading>

      <VStack
        w="100%"
        h="100%"
        overflowY="scroll"
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },

          "&": { scrollbarWidth: "none" },
        }}
      >
        <TempArea />
        <TempArea />
        <TempArea />
        <TempArea />
        <TempArea />
      </VStack>
    </Template>
  );
}
