import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useBreakpointValue, useToast } from "@chakra-ui/react";

export default function getAllUsers() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [allUsers, setAllUsers] = useState([]);

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
      let { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("clicks", { ascending: false })
        .order("username");
      if (error) throw error;

      if (data) setAllUsers(data);
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

  return allUsers;
}
