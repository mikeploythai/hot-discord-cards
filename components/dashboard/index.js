import { SimpleGrid } from "@chakra-ui/react";
import EmptySpace from "../general/empty-space";
import Profile from "./profile";

export default function Dashboard({ session }) {
  return (
    <SimpleGrid w="100%" h="fit-content" gap={4}>
      <EmptySpace />
      <Profile session={session} />
    </SimpleGrid>
  );
}
