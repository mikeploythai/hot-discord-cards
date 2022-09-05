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
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Profile({ session }) {
  const [loaded, setLoaded] = useState(false);
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    getProfileData();

    const realtimeUpdate = supabase
      .from("owners")
      .on("*", () => getProfileData())
      .subscribe();
    return () => supabase.removeSubscription(realtimeUpdate);
  }, [session]);

  async function getProfileData() {
    try {
      setLoaded(false);
      const user = supabase.auth.user();

      let { data, error } = await supabase
        .from("profiles")
        .select("username, bio")
        .eq("id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        let email = session.user.email.split("@", 1);
        setUsername(email[0]);
        setBio("This is a test bio for testing purposes :D");
        setDisable(false);
      } else {
        setUsername(data.username);
        setBio(data.bio);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoaded(true);
    }
  }

  async function updateProfileData() {
    try {
      setLoaded(false);
      const user = supabase.auth.user();

      const updates = { id: user.id, username, bio, updated_at: new Date() };
      let { error } = await supabase
        .from("profiles")
        .upsert(updates, { returning: "minimal" });

      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      setLoaded(true);
    }
  }

  return (
    <Container
      maxW="container.sm"
      h="fit-content"
      p={{ base: "24px", md: "48px" }}
      bgColor="white"
      boxShadow="xs"
    >
      <HStack gap={{ base: "10px", md: "40px" }}>
        <SkeletonCircle isLoaded={loaded} h="auto" w="auto">
          <Avatar size={{ base: "lg", md: "xl" }} name={username} />
        </SkeletonCircle>

        <VStack w="100%" align="start" gap={{ base: "0", md: "4px" }}>
          <HStack w="100%" justify="space-between">
            <Skeleton isLoaded={loaded}>
              <Heading
                size={{ base: "sm", md: "md" }}
                noOfLines={1}
                maxW={{ base: "100px", md: "initial" }}
              >
                {username}
              </Heading>
            </Skeleton>

            <Button
              size="xs"
              variant="outline"
              isDisabled={disable}
              onClick={() => {
                updateProfileData();
                setDisable(true);
              }}
            >
              Save Profile
            </Button>
          </HStack>

          <SkeletonText isLoaded={loaded}>
            <Text
              fontSize={{ base: "xs", md: "sm" }}
              wordBreak="break-word"
              whiteSpace="pre-line"
            >
              {bio}
            </Text>
          </SkeletonText>
        </VStack>
      </HStack>
    </Container>
  );
}
