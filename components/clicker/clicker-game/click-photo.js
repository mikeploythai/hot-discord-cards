import {
  Heading,
  Image,
  useBreakpointValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { supabase } from "../../../utils/supabaseClient";

export default function ClickPhoto({ points, getCurrentUser, getPointData }) {
  const toast = useToast();
  const toastPos = useBreakpointValue({ base: "bottom", md: "bottom-right" });
  const toastW = useBreakpointValue({ base: "100%", md: "320px" });
  const toastP = useBreakpointValue({ base: "0 16px 8px", md: "0 8px 8px" });

  useEffect(() => {
    getPointData();
  });

  async function updatePointData() {
    try {
      const user = await getCurrentUser();

      const updates = {
        id: user.id,
        points: points + 1,
        updated_at: new Date(),
      };

      let { error } = await supabase
        .from("profiles")
        .upsert(updates, { returning: "minimal" });
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
    } finally {
      getPointData();
    }
  }

  return (
    <VStack gap={{ base: "16px", md: "32px" }}>
      <Image
        src="https://cdn.discordapp.com/attachments/945912566000001045/1019300849685631046/image0.jpg"
        w="250px"
        boxShadow="lg"
        transition=".1s ease-in-out"
        _active={{ transform: "scale(1.25)", boxShadow: "2xl" }}
        onClick={() => updatePointData()}
      />
      <Heading size="md">Your Points: {points}</Heading>
    </VStack>
  );
}
