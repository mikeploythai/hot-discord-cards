import { Button } from "@chakra-ui/react";
import { supabase } from "../../../../utils/supabase-client";
import { FaSignOutAlt } from "react-icons/fa";

export default function SignOutButton({ size }) {
  return (
    <Button
      leftIcon={<FaSignOutAlt />}
      variant="outline"
      colorScheme="red"
      size={size}
      rounded="lg"
      onClick={() => supabase.auth.signOut()}
    >
      Sign Out
    </Button>
  );
}
