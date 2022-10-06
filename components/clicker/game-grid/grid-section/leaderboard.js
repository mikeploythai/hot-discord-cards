import { Text, useBreakpointValue, useToast, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../../../utils/supabase-client";

export default function Leaderboard({session, getCurrentUser}) {
  const [clicks, setClicks] = useState(0);

  const toast = useToast();
  const toastPos = useBreakpointValue(["bottom", "bottom-right"]);
  const toastW = useBreakpointValue(["100%", "320px"]);
  const toastP = useBreakpointValue(["0 16px 8px", "0 8px 8px"]);

  useEffect(() => {
    getClickData();

    const realtime = supabase
      .channel("profiles")
      .on("postgres_changes", { event: "*", schema: "*" }, () => {
        getClickData()
      })
      .subscribe();
    return () => supabase.removeChannel(realtime);
  }, [session]);

  async function getClickData() {
    try {
      const user = await getCurrentUser();

      let { data, error } = await supabase
        .from("profiles")
        .select("clicks")
        .eq("id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) setClicks(data.clicks);
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
    <VStack
      h="100%"
      p={["24px", "48px"]}
      bgColor="white"
      boxShadow="xs"
      rounded="lg"
      gap={["16px", "32px"]}
    >
      <Text>{clicks}</Text>
    </VStack>
  );
}
