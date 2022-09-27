import { SimpleGrid } from "@chakra-ui/react";
import { supabase } from "../../utils/supabase-client";
import EmptySpace from "../general/empty-space";
import GameGrid from "./game-grid";

export default function Clicker({ session }) {
  async function getCurrentUser() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) throw error;
    if (!session?.user) throw new Error("User not logged in");
    return session.user;
  }

  return (
    <SimpleGrid w="100%" h="fit-content" gap="16px">
      <EmptySpace />
      <GameGrid session={session} getCurrentUser={getCurrentUser} />
    </SimpleGrid>
  );
}
