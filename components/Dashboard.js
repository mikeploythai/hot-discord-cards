import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Avatar,
  Heading,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Cards from "./Cards";

export default function Dashboard({ session }) {
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);

  const [disableSave, setDisableSave] = useState(true);
  const [disableCard, setDisableCard] = useState(true);

  useEffect(() => {
    getProfileData();

    const realtimeUpdate = supabase
      .from("profiles")
      .on("*", () => {
        getProfileData();
      })
      .subscribe();
    return () => supabase.removeSubscription(realtimeUpdate);
  }, [session]);

  async function getProfileData() {
    try {
      const user = supabase.auth.user();

      let { data, error } = await supabase
        .from("profiles")
        .select("username, bio")
        .eq("id", user.id)
        .maybeSingle();
      if (error) throw error;

      if (data) {
        setUsername(data.username);
        setBio(data.bio);
        setDisableCard(false);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function updateProfile() {
    try {
      const user = supabase.auth.user();
      const updates = { id: user.id, username, bio, updated_at: new Date() };

      let { error } = await supabase
        .from("profiles")
        .upsert(updates, { returning: "minimal" });
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  }

  async function addCard() {
    try {
      let { data: card } = await supabase.from("cards").select("id");
      const rand = Math.floor(Math.random() * card.length);
      const result = card[rand].id;

      const user = supabase.auth.user();
      let { data: db, error } = await supabase
        .from("owners")
        .select("card_id, cards!inner (name)")
        .eq("user_id", user.id);

      let insert = async () => {
        await supabase
          .from("owners")
          .insert([{ user_id: user.id, card_id: result }], {
            upsert: true,
          });
      };

      if (db.length === 0) {
        insert();
      } else {
        for (let i = 0; i < db.length; i++) {
          if (db[i].card_id === result) {
            alert(`You already own ${db[i].cards.name}!`);
          } else {
            insert();
          }
        }
      }

      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <VStack gap="64px">
      <VStack gap="16px">
        <Avatar size="2xl" name={username} />

        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            id="username"
            type="text"
            placeholder={username || "Add a username"}
            onChange={(e) => {
              setUsername(e.target.value);
              setDisableSave(false);
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
              setDisableSave(false);
            }}
          />
        </FormControl>

        <Button
          colorScheme="blue"
          onClick={() => {
            updateProfile();
            alert("Changes saved!");
            setDisableSave(true);
          }}
          isDisabled={disableSave}
        >
          Save Changes
        </Button>

        <Button onClick={() => supabase.auth.signOut()}>Sign Out</Button>
      </VStack>

      <VStack gap="32px">
        <VStack gap="16px">
          <Heading size="md">Your Cards</Heading>
          <Button onClick={() => addCard()} isDisabled={disableCard}>
            Add Card
          </Button>
        </VStack>
        <Cards />
      </VStack>
    </VStack>
  );
}
