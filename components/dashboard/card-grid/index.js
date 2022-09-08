import {
  Button,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Skeleton,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import Card from "./card";

export default function CardGrid({ getCurrentUser }) {
  const [loaded, setLoaded] = useState(false);
  const [card, setCard] = useState([]);

  useEffect(() => {
    getCardData();

    const realtime = supabase
      .channel("owners")
      .on("postgres_changes", { event: "*", schema: "*" }, () => {
        getCardData();
      })
      .subscribe();
    return () => supabase.removeChannel(realtime);
  }, []);

  async function getCardData() {
    try {
      setLoaded(false);
      const user = await getCurrentUser();

      let { data: card, error } = await supabase
        .from("cards")
        .select("name, attribute, image, id, owners!inner (*)")
        .eq("owners.user_id", user.id);
      if (error) throw error;

      if (card) setCard(card);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoaded(true);
    }
  }

  async function addRandomCard() {
    try {
      setLoaded(false);
      let { data: card } = await supabase.from("cards").select("id");
      const rand = Math.floor(Math.random() * card.length);
      const result = card[rand].id;

      const user = await getCurrentUser();
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
            setLoaded(true);
            alert(`You already own ${db[i].cards.name}!`);
          } else {
            insert();
          }
        }
      }

      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      setLoaded(true);
    }
  }

  return (
    <Container maxW="container.md" p="0">
      <VStack
        p={{ base: "24px 24px 48px", md: "32px" }}
        bgColor="white"
        boxShadow="xs"
        rounded="lg"
        gap="20px"
      >
        <HStack w="100%" justify="space-between">
          <Heading size="md">Your Cards</Heading>
          <Button size="sm" onClick={() => addRandomCard()}>
            Add
          </Button>
        </HStack>

        <SimpleGrid
          w="100%"
          columns={[1, 2, 3]}
          spacing="32px"
          justifyItems={{ base: "center", md: "initial" }}
          m="0"
        >
          {card.map((c) => {
            return (
              <Skeleton isLoaded={loaded} rounded="lg">
                <Card
                  key={c.id}
                  name={c.name}
                  attr={c.attribute}
                  img={c.image}
                  id={c.id}
                />
              </Skeleton>
            );
          })}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
