import { Center, Flex } from "@chakra-ui/react";
import Auth from "../components/auth";
import Dashboard from "../components/dashboard";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Flex minH="100vh" justify="center">
      {!session ? (
        <Center>
          <Auth />
        </Center>
      ) : (
        <Dashboard key={session.user.id} session={session} />
      )}
    </Flex>
  );
}
