import {
  Avatar,
  Button,
  Container,
  Heading,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import EditProfileOverlay from "./edit-profile-overlay";

export default function Profile({ session }) {
  const [loaded, isLoaded] = useState(true);
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getProfileData();
  }, [session]);

  async function getCurrentUser() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) throw error;
    if (!session?.user) throw new Error("User not logged in");
    return session.user;
  }

  async function getProfileData() {
    try {
      isLoaded(false);
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
    } finally {
      isLoaded(true);
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
        <SkeletonCircle isLoaded={loaded} h="auto" w="auto">
          <Avatar size={{ base: "md", md: "xl" }} name={username} />
        </SkeletonCircle>

        <VStack w="100%" align="start" gap={{ base: "0", md: "2px" }}>
          <HStack w="100%" justify="space-between">
            <Skeleton w="40%" isLoaded={loaded}>
              <Heading size={{ base: "md", md: "lg" }}>@{username}</Heading>
            </Skeleton>

            <Button
              size={{ base: "xs", md: "sm" }}
              variant="outline"
              onClick={onOpen}
            >
              Edit
            </Button>
          </HStack>

          <SkeletonText w="80%" isLoaded={loaded}>
            <Text fontSize="sm" whiteSpace="pre-wrap">
              {bio}
            </Text>
          </SkeletonText>
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
