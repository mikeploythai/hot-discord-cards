import { Heading, Image, Text, HStack, VStack, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Cards() {
  const [card, setCard] = useState([]);

  useEffect(() => {
    getCardData();
  }, []);

  async function getCardData() {
    try {
      let user = supabase.auth.user();

      let { data: card, error } = await supabase
        .from("cards")
        .select(`name, id, image, attribute`)
        .eq("owner", user.id);
      if (error) throw error;

      if (card) setCard(card);
    } catch (error) {
      alert(error.error_description || error.message);
    }
  }

  return (
    <>
      <HStack gap="32px">
        {card.map((c) => (
          <VStack
            w="250px"
            minH="350px"
            borderRadius="16px"
            padding="16px"
            gap="8px"
            shadow="md"
            transition="0.25s ease-in-out"
            _hover={{ shadow: "xl" }}
          >
            <Flex w="100%" justify="space-between" align="center">
              <Heading size="sm">{c.name}</Heading>
              <Text size="sm">{c.attribute}</Text>
            </Flex>

            <Image src={c.image} borderRadius="8px" />
          </VStack>
        ))}
      </HStack>
    </>
  );
}