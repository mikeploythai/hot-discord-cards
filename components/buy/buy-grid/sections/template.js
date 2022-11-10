import { VStack } from "@chakra-ui/react";

export default function Template({ h, maxH, justify, user, children }) {
  return (
    <VStack
      pos="relative"
      h={h}
      maxH={maxH}
      p={user ? { base: 3, md: 4 } : { base: 6, md: 8 }}
      gap={user ? 0 : 4}
      justify={justify}
      bgColor="white"
      boxShadow="xs"
      rounded="lg"
    >
      {children}
    </VStack>
  );
}
