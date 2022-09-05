import {
  Image,
  Text,
  HStack,
  VStack,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function Card() {
  const [loaded, setLoaded] = useState(false);
  const [card, setCard] = useState([]);

  useEffect(() => {
    getCardData();

    const realtimeUpdate = supabase
      .from("owners")
      .on("*", () => {
        getCardData();
      })
      .subscribe();
    return () => supabase.removeSubscription(realtimeUpdate);
  }, []);

  async function getCardData() {
    try {
      setLoaded(false);
      let user = supabase.auth.user();

      let { data: card, error } = await supabase
        .from("cards")
        .select(`name, id, image, attribute, owners!inner (*)`)
        .eq("owners.user_id", user.id);
      if (error) throw error;

      if (card) setCard(card);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoaded(true);
    }
  }

  async function deleteCard(id) {
    try {
      let { error } = await supabase
        .from("owners")
        .delete()
        .match({ card_id: id });
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <SimpleGrid columns={[1, 2, 3]} gap="64px">
      {card.map((c) => (
        <Skeleton isLoaded={loaded}>
          <VStack
            key={c.id}
            w={{base: "300px", md: "200px"}}
            h="auto"
            p="16px"
            gap="8px"
            boxShadow="xs"
            transition=".25s ease-in-out"
            _hover={{ transform: "scale(1.025)", cursor: "pointer" }}
            onClick={() => deleteCard(c.id)}
          >
            <HStack w="100%" justify="space-between">
              <Text fontSize="sm">
                <b>{c.name}</b>
              </Text>
              <Text fontSize="sm">{c.attribute}</Text>
            </HStack>
            <Image src={c.image} alt={c.name} />
          </VStack>
        </Skeleton>
      ))}
    </SimpleGrid>
  );
}
