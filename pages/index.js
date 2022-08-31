import { Flex } from "@chakra-ui/react";
import Auth from "../components/Auth";
import Dashboard from "../components/Dashboard";
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
    <Flex minH="100vh" align="center" justify="center" padding="128px">
      {!session ? (
        <Auth />
      ) : (
        <Dashboard key={session.user.id} session={session} />
      )}
    </Flex>
  );
}
