import {
  Container,
  Heading,
  SimpleGrid,
  useBreakpointValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase-client";
import Card from "./card";

export default function CardGrid({ session, getCurrentUser }) {
  const [card, setCard] = useState([]);

  const toast = useToast();
  const toastPos = useBreakpointValue(["bottom", "bottom-right"]);
  const toastW = useBreakpointValue(["100%", "320px"]);
  const toastP = useBreakpointValue(["0 16px 8px", "0 8px 8px"]);

  useEffect(() => {
    getCardData();

    const realtime = supabase
      .channel("owners")
      .on("postgres_changes", { event: "*", schema: "*" }, () => {
        getCardData();
      })
      .subscribe();
    return () => supabase.removeChannel(realtime);
  }, [session]);

  async function getCardData() {
    try {
      const user = await getCurrentUser();

      let { data: card, error } = await supabase
        .from("cards")
        .select("name, attribute, image, id, owners!inner (*)")
        .eq("owners.user_id", user.id);
      if (error) throw error;

      if (card) setCard(card);
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
      <VStack
        p={["24px 24px 48px", "48px"]}
        bgColor="white"
        boxShadow="xs"
        rounded="lg"
        gap="20px"
      >
        <Heading size={["sm", "md"]} w="100%" alignItems="start">
          Your Cards
        </Heading>

        <SimpleGrid
          w="100%"
          columns={[2, 3]}
          spacing={["16px", "32px"]}
          justifyItems={["center", "initial"]}
          m="0"
        >
          {card.map((card) => {
            return (
              <Card
                key={card.id}
                name={card.name}
                attr={card.attribute}
                img={card.image}
                id={card.id}
                getCardData={getCardData}
              />
            );
          })}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
