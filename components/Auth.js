import { Button, Heading, VStack } from "@chakra-ui/react";
import { supabase } from "../utils/supabaseClient";
import { FaGithub } from "react-icons/fa";

export default function Auth() {
  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signIn({
        provider: "github",
      });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  return (
    <VStack gap="16px">
      <Heading>Sign In Test</Heading>

      <Button
        size="lg"
        colorScheme="gray"
        leftIcon={<FaGithub />}
        onClick={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        GitHub
      </Button>
    </VStack>
  );
}
