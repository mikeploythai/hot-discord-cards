import { useBreakpointValue, useToast, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import ClickPhoto from "./click-photo";

export default function Game({ getCurrentUser }) {
  const [points, setPoints] = useState(0);

  const toast = useToast();
  const toastPos = useBreakpointValue({ base: "bottom", md: "bottom-right" });
  const toastW = useBreakpointValue({ base: "100%", md: "320px" });
  const toastP = useBreakpointValue({ base: "0 16px 8px", md: "0 8px 8px" });

  useEffect(() => {
    getPointData();
  });

  async function getPointData() {
    try {
      const user = await getCurrentUser();

      let { data, error } = await supabase
        .from("profiles")
        .select("points")
        .eq("id", user.id)
        .maybeSingle();
      if (error) throw error;

      if (data) setPoints(data.points);
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
      p={{ base: "24px", md: "48px" }}
      bgColor="white"
      boxShadow="xs"
      rounded="lg"
      gap={{ base: "16px", md: "32px" }}
    >
      <ClickPhoto
        points={points}
        getCurrentUser={getCurrentUser}
        getPointData={getPointData}
      />
    </VStack>
  );
}
