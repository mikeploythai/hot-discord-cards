import { SimpleGrid } from "@chakra-ui/react";
import EmptySpace from "../general/empty-space";

export default function Buy({ children }) {
  return (
    <SimpleGrid templateRows={"min-content 1fr"} w="100%" gap={4}>
      <EmptySpace />
      {children}
    </SimpleGrid>
  );
}
