import {
  Avatar,
  Button,
  Container,
  Heading,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import EditProfileOverlay from "./edit-profile-overlay";

export default function Profile({ session, getCurrentUser }) {
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Container maxW="container.md" p="0">
      <HStack
        p={{ base: "24px", md: "32px" }}
        bgColor="white"
        boxShadow="xs"
        rounded="lg"
        gap={{ base: "16px", md: "32px" }}
      >
        <Avatar size={{ base: "md", md: "xl" }} name={username} />

        <VStack w="100%" align="start" gap={{ base: "0", md: "2px" }}>
          <HStack w="100%" justify="space-between">
            <Heading size={{ base: "md", md: "lg" }}>@{username}</Heading>

            <Button
              size={{ base: "xs", md: "sm" }}
              variant="outline"
              onClick={onOpen}
            >
              Edit
            </Button>
          </HStack>

          {bio === null ? null : (
            <Text fontSize="sm" whiteSpace="pre-wrap">
              {bio}
            </Text>
          )}
        </VStack>
      </HStack>

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
