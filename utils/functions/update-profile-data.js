import { supabase } from "../supabase-client";
import getCurrentUser from "./get-current-user";

export default async function updateProfileData(changes, toastProps) {
  try {
    const user = await getCurrentUser();
    const updates = {
      id: user.id,
      updated_at: new Date(),
      ...changes,
    };

    if (updates.bio === " ") {
      updates.bio = "";
    }

    let { error } = await supabase
      .from("profiles")
      .upsert(updates, { returning: "minimal" });
    if (error) throw error;
  } catch (error) {
    toastProps.toast({
      title: "Error!",
      description: error.message,
      status: "error",
      position: toastProps.toastPos,
      containerStyle: {
        w: toastProps.toastW,
        p: toastProps.toastP,
      },
      isClosable: true,
    });
  } finally {
    toastProps.toast({
      title: "Success!",
      description: "You've updated your profile.",
      status: "success",
      position: toastProps.toastPos,
      containerStyle: {
        w: toastProps.toastW,
        p: toastProps.toastP,
      },
      isClosable: true,
    });
  }
}
