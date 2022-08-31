import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Avatar,
  Heading,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Cards from "./Cards";

export default function Dashboard({ session }) {
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarURL] = useState(null);
  const [bio, setBio] = useState(null);
  const [points, setPoints] = useState(0);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    getProfileData();
  }, [session]);

  async function getProfileData() {
    try {
      const user = supabase.auth.user();

      let { data, error } = await supabase
        .from("profiles")
        .select(`username, bio, avatar_url, points`)
        .eq("id", user.id)
        .single();
      if (error) throw error;

      if (data) {
        setUsername(data.username);
        setBio(data.bio);
        setAvatarURL(data.avatar_url);
        setPoints(data.points);
      }
    } catch (error) {
      alert(error.error_description || error.message);
    }
  }

  async function updateProfile({ username }) {
    try {
      const user = supabase.auth.user();

      const updates = { id: user.id, username, bio, updated_at: new Date() };
      let { error } = await supabase
        .from("profiles")
        .upsert(updates, { returning: "minimal" });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    }
  }

  return (
    <VStack gap="64px">
      <VStack gap="16px">
        <Avatar size="2xl" src={avatar_url} />

        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            id="username"
            type="text"
            placeholder={username || "Add a username"}
            onChange={(e) => {
              setUsername(e.target.value);
              setDisable(false);
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Bio</FormLabel>
          <Input
            id="bio"
            type="text"
            placeholder={bio || "Add a bio"}
            onChange={(e) => {
              setBio(e.target.value);
              setDisable(false);
            }}
          />
        </FormControl>

        <Text>Points: {points}</Text>

        <Button
          colorScheme="blue"
          onClick={() => {
            updateProfile({ username, bio });
            alert("Changes saved!");
            setDisable(true);
          }}
          isDisabled={disable}
        >
          Save Changes
        </Button>

        <Button onClick={() => supabase.auth.signOut()}>Sign Out</Button>
      </VStack>

      <VStack gap="16px">
        <Heading size="md">Your Cards</Heading>
        <Cards />
      </VStack>
    </VStack>
  );
}
