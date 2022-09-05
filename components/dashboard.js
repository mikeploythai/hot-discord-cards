import { VStack } from "@chakra-ui/react";
import CardGrid from "./cardGrid";
import Nav from "./nav";
import Profile from "./profile";

export default function Dashboard({ session }) {
  return (
    <>
      <Nav />
      <VStack w="100%" p={{ base: "72px 16px 0", md: "96px" }} gap={{base: "16px", md: "32px"}}>
        <Profile key={session.user.id} session={session} />
        <CardGrid />
      </VStack>
    </>
  );
}
