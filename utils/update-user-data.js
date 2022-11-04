import { useBreakpointValue, useToast } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export function updateUserData() {
  const supabase = useSupabaseClient();
  const user = useUser();

  const toast = useToast();
  const toastPos = useBreakpointValue({ base: "bottom", md: "bottom-right" });
  const toastW = useBreakpointValue({ base: "100%", md: "320px" });
  const toastP = useBreakpointValue({ base: "0 16px 8px", md: "0 8px 8px" });

  async function updateData(changes, game) {
    try {
      const updates = {
        id: user.id,
        updated_at: new Date().toISOString(),
        ...changes,
      };
      if (updates.bio === " ") updates.bio = "";
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
      if (!game) {
        toast({
          title: "Success!",
          description: "Your profile has been updated.",
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
  }

  return { updateData };
}
