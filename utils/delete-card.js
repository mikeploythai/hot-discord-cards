import { useBreakpointValue, useToast } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { updateUserData } from "./update-user-data";
import getUserData from "./get-user-data";

export default function deleteCard() {
  const supabase = useSupabaseClient();

  const toast = useToast();
  const toastPos = useBreakpointValue({ base: "bottom", md: "bottom-right" });
  const toastW = useBreakpointValue({ base: "100%", md: "320px" });
  const toastP = useBreakpointValue({ base: "0 16px 8px", md: "0 8px 8px" });

  let cashback;
  const { userData } = getUserData();
  const { updateData } = updateUserData();

  function calcCashback(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async function remove(id) {
    try {
      let { data: card, error: cardError } = await supabase
        .from("cards")
        .select("tier")
        .eq("id", id)
        .single();
      if (cardError) throw cardError;

      if (card) {
        if (card.tier === "common") cashback = calcCashback(1, 50);
        else if (card.tier === "rare") cashback = calcCashback(51, 100);
        else if (card.tier === "super rare") cashback = calcCashback(101, 150);
        else if (card.tier === "mega rare") cashback = calcCashback(151, 200);
      }

      let { error } = await supabase
        .from("owners")
        .delete()
        .match({ card_id: id });
      if (error) throw error;

      updateData({ points: userData.points + cashback }, true);
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
      toast({
        title: "Card Released",
        description: `You got ${cashback} dabloons back!`,
        status: "success",
        position: toastPos,
        containerStyle: {
          w: toastW,
          p: toastP,
        },
        isClosable: true,
      });
    }
  }

  return { remove };
}
