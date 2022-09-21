import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Nav from "../components/nav";
import "../utils/globals.css";
import { supabase } from "../utils/supabaseClient";

function HotDiscordCards({ Component, pageProps }) {
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
    <ChakraProvider>
      <Nav session={session} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default HotDiscordCards;
