import { SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabase-client";
import EmptySpace from "../general/empty-space";
import BuyGrid from "./buy-grid";

export default function Buy({ session }) {
  const route = useRouter();

  async function getCurrentUser() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) throw error;

    if (!session?.user) {
      setTimeout(() => route.reload(), 1000);
      throw new Error("User not logged in. Reloading...");
    }

    return session.user;
  }

  return (
    <SimpleGrid w="100%" h="fit-content" gap="16px">
      <EmptySpace />
      <BuyGrid session={session} getCurrentUser={getCurrentUser} />
    </SimpleGrid>
  );
}
