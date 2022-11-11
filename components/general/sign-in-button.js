import {
  Button,
  useBreakpointValue,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { FaDiscord } from "react-icons/fa";

export default function SignInButton({ small, large }) {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);
  const [notLandscape] = useMediaQuery("(min-height: 480px)");

  const toast = useToast();
  const toastPos = useBreakpointValue({ base: "bottom", md: "bottom-right" });
  const toastW = useBreakpointValue({ base: "100%", md: "320px" });
  const toastP = useBreakpointValue({ base: "0 16px 8px", md: "0 8px 8px" });

  async function handleLogin() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "discord",
      });
      if (error) throw error;
    } catch (error) {
      toast({
        title: "Error!",
        description: error.message,
        status: "error",
        position: toastPos,
        containerStyle: {
          w: toastW,
          p: toastP,
        },
        isClosable: true,
      });
    }
  }

  return (
    <Button
      leftIcon={<FaDiscord />}
      size={{ base: large, md: notLandscape ? large : small }}
      colorScheme="purple"
      rounded="lg"
      onClick={() => {
        setLoading(true);
        handleLogin();
      }}
      isLoading={loading}
    >
      Sign In with Discord
    </Button>
  );
}
