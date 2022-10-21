import { useBreakpointValue, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../supabase-client";
import getCurrentUser from "../functions/get-current-user";

export default function getProfileData({ session }) {
  const [userData, setUserData] = useState(null);
  const toast = useToast();
  const toastPos = useBreakpointValue({ base: "bottom", md: "bottom-right" });
  const toastW = useBreakpointValue({ base: "100%", md: "320px" });
  const toastP = useBreakpointValue({ base: "0 16px 8px", md: "0 8px 8px" });

  useEffect(() => {
    profileData();
    const realtime = supabase
      .channel("profiles")
      .on("postgres_changes", { event: "*", schema: "*" }, () => {
        profileData();
      })
      .subscribe();
    return () => supabase.removeChannel(realtime);
  }, [session, userData]);

  async function profileData() {
    try {
      const user = await getCurrentUser();
      let { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      if (error) throw error;
      if (data) setUserData(data);
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
  return { userData };
}
