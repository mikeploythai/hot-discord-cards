import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase-client";
import Nav from "../components/nav";
import "../styles/globals.css";

export default function HotDiscordCards({ Component, pageProps }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (mounted) if (session) setSession(session);
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
    <ChakraProvider>
      <Nav session={session} />
      <Component session={session} setSession={setSession} {...pageProps} />
    </ChakraProvider>
  );
}
