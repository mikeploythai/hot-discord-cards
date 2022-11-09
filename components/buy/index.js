import { SimpleGrid } from "@chakra-ui/react";
import EmptySpace from "../general/empty-space";

export default function Buy({ children }) {
  return (
    <SimpleGrid templateRows={"min-content min-content"} w="100%" gap={4}>
      <EmptySpace />
      {children}
    </SimpleGrid>
  );
}
