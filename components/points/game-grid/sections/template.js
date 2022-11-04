import { VStack } from "@chakra-ui/react";

export default function Template({ h, maxH, justify, board, children }) {
  return (
    <VStack
      pos="relative"
      h={h}
      maxH={maxH}
      p={board ? { base: 3, md: 4 } : { base: 6, md: 8 }}
      gap={board ? 0 : 4}
      justify={justify}
      bgColor="white"
      boxShadow="xs"
      rounded="lg"
    >
      {children}
    </VStack>
  );
}
