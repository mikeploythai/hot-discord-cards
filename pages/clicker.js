import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Clicker from "../components/clicker";
import { useRouter } from "next/router";

export default function ClickerPage() {
  const [loaded, isLoaded] = useState(false);
  const [session, setSession] = useState(null);
  const route = useRouter();

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted) {
        if (session) setSession(session);
        else route.push("/");
        isLoaded(true);
      }
    }

    getInitialSession();

    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <Flex minH="100vh" justify="center" p="16px" bgColor="gray.50">
      {!session ? null : <Clicker />}
    </Flex>
  );
}
