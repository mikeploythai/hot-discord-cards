import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useBreakpointValue, useToast } from "@chakra-ui/react";

export default function getCardData(select, param1, param2) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const session = useSession();
  const [cardData, setCardData] = useState([]);

  const toast = useToast();
  const toastPos = useBreakpointValue({ base: "bottom", md: "bottom-right" });
  const toastW = useBreakpointValue({ base: "100%", md: "320px" });
  const toastP = useBreakpointValue({ base: "0 16px 8px", md: "0 8px 8px" });

  useEffect(() => {
    getData();

    const realtime = supabase
      .channel("owners")
      .on("postgres_changes", { event: "*", schema: "*" }, () => {
        getData();
      })
      .subscribe();
    return () => supabase.removeChannel(realtime);
  }, [session]);

  async function getData() {
    try {
      if (user) {
        let { data: card, error } = await supabase
          .from("cards")
          .select(select)
          .eq(param1, param2 || user.id);
        if (error) throw error;

        if (card) {
          if (select === "*") {
            const randNum = Math.floor(Math.random() * card.length);
            setCardData(card[randNum]);
          } else setCardData(card);
        }
      }
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

  return { cardData, getData };
}
