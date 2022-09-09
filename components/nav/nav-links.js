import { Button, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

export default function NavLinks({ session, handleLogin }) {
  const [loading, isLoading] = useState(false);

  return (
    <HStack>
      {!session ? (
        <Button href="/" variant="ghost" size="sm">
          GitHub Repo
        </Button>
      ) : null}

      {!session ? (
        <Button
          leftIcon={<FaSignInAlt />}
          variant="outline"
          colorScheme="purple"
          size="sm"
          onClick={() => {
            isLoading(true);
            handleLogin();
          }}
          isLoading={loading}
        >
          Sign In
        </Button>
      ) : (
        <Button
          leftIcon={<FaSignOutAlt />}
          variant="outline"
          colorScheme="red"
          size="sm"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </Button>
      )}
    </HStack>
  );
}
