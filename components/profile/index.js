import { SimpleGrid } from "@chakra-ui/react";
import EmptySpace from "../general/empty-space";

export default function Profile({ children }) {
  return (
    <SimpleGrid w="100%" h="fit-content" gap={4}>
      <EmptySpace />
      {children}
    </SimpleGrid>
  );
}
