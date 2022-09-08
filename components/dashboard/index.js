import { SimpleGrid } from "@chakra-ui/react";
import Spacer from "../general/spacer";
import CardGrid from "./card-grid";
import Profile from "./profile";

export default function Dashboard({ session }) {
  return (
    <SimpleGrid w="100%" h="fit-content" gap="16px">
      <Spacer />
      <Profile key={session.user.id} session={session} />
      <CardGrid />
    </SimpleGrid>
  );
}
