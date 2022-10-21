import {
  Button,
  Grid,
  GridItem,
  Heading,
  Text,
  useBreakpointValue,
  useMediaQuery,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaDiscord } from "react-icons/fa";
import { supabase } from "../../utils/supabase-client";
import EmptySpace from "./empty-space";

export default function Landing() {
  const [loading, isLoading] = useState(false);
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
    <Grid
      w="100%"
      templateAreas={`
        'header'
        'main'
        'main'
      `}
      gap={4}
    >
      <GridItem area={"header"}>
        <EmptySpace />
      </GridItem>
      <GridItem area={"main"}>
        <VStack gap={{ base: 8, md: 12 }}>
          <VStack
            textAlign="center"
            maxW={notLandscape ? "2xl" : "md"}
            gap={{ base: 0.5, md: 2 }}
          >
            <Heading size={{ base: "xl", md: notLandscape ? "3xl" : "xl" }}>
              One of the trading card games of all time.
            </Heading>
            <Text
              fontSize={{ base: "md", md: notLandscape ? "xl" : "md" }}
              fontWeight="medium"
            >
              A CPSC 362 Project by Mike &amp; Shaleen.
            </Text>
          </VStack>
          <Button
            leftIcon={<FaDiscord />}
            size={{ base: "md", md: notLandscape ? "lg" : "md" }}
            colorScheme="purple"
            rounded="lg"
            onClick={() => {
              isLoading(true);
              handleLogin();
            }}
            isLoading={loading}
          >
            Sign In with Discord
          </Button>
        </VStack>
      </GridItem>
    </Grid>
  );
}
