import { SimpleGrid } from "@chakra-ui/react";
import { supabase } from "../../utils/supabaseClient";
import Spacer from "../general/spacer";
import CardGrid from "./card-grid";
import Profile from "./profile";

export default function Dashboard() {
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
      <Spacer />
      <Profile getCurrentUser={getCurrentUser} />
      <CardGrid getCurrentUser={getCurrentUser} />
    </SimpleGrid>
  );
}
