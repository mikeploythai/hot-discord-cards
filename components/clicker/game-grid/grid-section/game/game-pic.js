import { Image, useBreakpointValue, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { supabase } from "../../../../../utils/supabase-client";

export default function GamePic({ points, getCurrentUser, getPointData }) {
  const toast = useToast();
  const toastPos = useBreakpointValue(["bottom", "bottom-right"]);
  const toastW = useBreakpointValue(["100%", "320px"]);
  const toastP = useBreakpointValue(["0 16px 8px", "0 8px 8px"]);

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
    <Image
      src="https://cdn.discordapp.com/attachments/945912566000001045/1019300849685631046/image0.jpg"
      w="250px"
      boxShadow="lg"
      rounded="lg"
      transition=".1s ease-in-out"
      _active={{ transform: "scale(1.25)", boxShadow: "2xl" }}
      onClick={() => updatePointData()}
    />
  );
}
