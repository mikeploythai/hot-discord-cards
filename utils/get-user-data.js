import { useBreakpointValue, useToast } from "@chakra-ui/react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  NumberDictionary,
} from "unique-names-generator";
import { updateUserData } from "./update-user-data";

export default function getUserData(select, p1, p2) {
  const [userData, setUserData] = useState(false);
  const supabase = useSupabaseClient();
  const session = useSession();
  const { updateData } = updateUserData();

  const toast = useToast();
  const toastPos = useBreakpointValue({ base: "bottom", md: "bottom-right" });
  const toastW = useBreakpointValue({ base: "100%", md: "320px" });
  const toastP = useBreakpointValue({ base: "0 16px 8px", md: "0 8px 8px" });

  useEffect(() => {
    getData();

    const realtime = supabase
      .channel("profiles")
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
        .select(select)
        .eq(p1, p2)
        .maybeSingle();
      if (error) throw error;

      if (data) setUserData(data);
      else {
        const randomNumber = NumberDictionary.generate({ min: 100, max: 999 });
        const randomName = uniqueNamesGenerator({
          dictionaries: [adjectives, animals, randomNumber],
          length: 3,
          separator: "",
          style: "capital",
        });

        let changes = {
          username: randomName,
          bio: "Tap the edit button to change your info!",
          picture: session.user.user_metadata.picture,
        };
        updateData(changes);
        getData();
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
    } finally {
      return userData;
    }
  }

  return { userData };
}
