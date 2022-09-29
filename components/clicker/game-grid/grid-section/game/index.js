import {
  Heading,
  useBreakpointValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../../../../utils/supabase-client";
import GamePic from "./game-pic";

export default function Game({ session, getCurrentUser }) {
  const [points, setPoints] = useState(0);

  const toast = useToast();
  const toastPos = useBreakpointValue(["bottom", "bottom-right"]);
  const toastW = useBreakpointValue(["100%", "320px"]);
  const toastP = useBreakpointValue(["0 16px 8px", "0 8px 8px"]);

  useEffect(() => {
    getPointData();
  }, [session]);

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
      p={["24px", "48px"]}
      bgColor="white"
      boxShadow="xs"
      rounded="lg"
      gap={["16px", "32px"]}
    >
      <GamePic
        points={points}
        session={session}
        getCurrentUser={getCurrentUser}
        getPointData={getPointData}
      />

      <Heading size="md">Points: {points}</Heading>
    </VStack>
  );
}
