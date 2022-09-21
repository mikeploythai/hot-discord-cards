import {
  Avatar,
  Button,
  Container,
  Heading,
  HStack,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import EditProfileOverlay from "./edit-profile-overlay";

export default function Profile({ getCurrentUser }) {
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const toastPos = useBreakpointValue({ base: "bottom", md: "bottom-right" });
  const toastW = useBreakpointValue({ base: "100%", md: "320px" });
  const toastP = useBreakpointValue({ base: "0 16px 8px", md: "0 8px 8px" });

  useEffect(() => {
    getProfileData();
  });

  async function getProfileData() {
    try {
      const user = await getCurrentUser();

      let { data, error } = await supabase
        .from("profiles")
        .select("username, bio, points")
        .eq("id", user.id)
        .maybeSingle();
      if (error) throw error;

      if (data) {
        setUsername(data.username);
        setBio(data.bio);
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
    <Container maxW="container.md" p="0">
      <HStack
        p={{ base: "24px", md: "48px" }}
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

          <Text
            fontSize={{ base: "xs", md: "sm" }}
            wordBreak="break-word"
            whiteSpace="pre-wrap"
            noOfLines={5}
          >
            {bio}
          </Text>
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
