import { Center, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Landing from "../components/general/landing";

export default function BuyPage() {
  const [loaded, isLoaded] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted) {
        if (session) setSession(session);
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
      {!session ? (
        <Center m="0" p="0">
          <Landing />
        </Center>
      ) : null}
    </Flex>
  );
}
