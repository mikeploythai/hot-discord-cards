import {
  Container,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase-client";
import EditProfileOverlay from "./edit-profile-overlay";
import ProfileCard from "./profile-card";

export default function Profile({ session, getCurrentUser }) {
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);
  const [pic, setPic] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const toastPos = useBreakpointValue(["bottom", "bottom-right"]);
  const toastW = useBreakpointValue(["100%", "320px"]);
  const toastP = useBreakpointValue(["0 16px 8px", "0 8px 8px"]);

  useEffect(() => {
    getProfileData();
  }, [session]);

  async function getProfileData() {
    try {
      const user = await getCurrentUser();

      let { data, error } = await supabase
        .from("profiles")
        .select("username, bio")
        .eq("id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setUsername(data.username);
        setBio(data.bio);
        setPic(user.user_metadata.picture);
      } else {
        const update = {
          id: user.id,
          username: user.user_metadata.name,
          bio: "Tap on edit to change your username and bio!",
          updated_at: new Date(),
        };

        let { error } = await supabase
          .from("profiles")
          .upsert(update, { returning: "minimal" });

        if (error) throw error;
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

  return (
    <Container maxW="container.md" p={0}>
      <ProfileCard username={username} bio={bio} pic={pic} onOpen={onOpen} />

      <EditProfileOverlay
        isOpen={isOpen}
        onClose={onClose}
        userText={username}
        bioText={bio}
        getCurrentUser={getCurrentUser}
        getProfileData={getProfileData}
      />
    </Container>
  );
}
