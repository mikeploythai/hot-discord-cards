import { Button, Heading, HStack, VStack } from "@chakra-ui/react";
import { supabase } from "../utils/supabaseClient";
import { FaDiscord, FaGithub } from "react-icons/fa";

export default function Auth() {
  const handleGitHubLogin = async () => {
    try {
      const { error } = await supabase.auth.signIn({
        provider: "github",
      });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  const handleDiscordLogin = async () => {
    try {
      const { error } = await supabase.auth.signIn({
        provider: "discord",
      });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  return (
    <VStack gap="16px">
      <Heading>Sign In Test</Heading>

      <HStack gap="32px">
        <Button
          size="lg"
          colorScheme="gray"
          leftIcon={<FaGithub />}
          onClick={(e) => {
            e.preventDefault();
            handleGitHubLogin();
          }}
        >
          GitHub
        </Button>

        <Button
          size="lg"
          colorScheme="gray"
          leftIcon={<FaDiscord />}
          onClick={(e) => {
            e.preventDefault();
            handleDiscordLogin();
          }}
        >
          Discord
        </Button>
      </HStack>
    </VStack>
  );
}
