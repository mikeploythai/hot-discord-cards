import { SimpleGrid } from "@chakra-ui/react";
import { supabase } from "../../utils/supabaseClient";
import Spacer from "../general/spacer";
import BuyGrid from "./buy-grid";

export default function Buy() {
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
      <BuyGrid getCurrentUser={getCurrentUser} />
    </SimpleGrid>
  );
}
