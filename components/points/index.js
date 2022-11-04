import { SimpleGrid } from "@chakra-ui/react";
import EmptySpace from "../general/empty-space";
import GameGrid from "./game-grid";

export default function Points() {
  return (
    <SimpleGrid templateRows={"min-content 1fr"} w="100%" gap={4}>
      <EmptySpace />
      <GameGrid />
    </SimpleGrid>
  );
}
