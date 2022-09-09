import { Button, HStack, Link } from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

export default function NavLinks({ session, handleLogin }) {
  const [loading, isLoading] = useState(false);

  return (
    <HStack>
      {!session ? (
        <Link
          href="https://github.com/mploythai/hot-discord-cards"
          _hover={{ textDecor: "none" }}
          isExternal
        >
          <Button variant="ghost" size="sm">
            GitHub Repo
          </Button>
        </Link>
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
