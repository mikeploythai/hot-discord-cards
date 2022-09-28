import { SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabase-client";
import EmptySpace from "../general/empty-space";
import CardGrid from "./card-grid";
import Profile from "./profile";

export default function Dashboard({ session }) {
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
      <Profile session={session} getCurrentUser={getCurrentUser} />
      <CardGrid session={session} getCurrentUser={getCurrentUser} />
    </SimpleGrid>
  );
}
