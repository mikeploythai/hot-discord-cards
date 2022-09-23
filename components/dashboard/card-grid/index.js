import {
  Container,
  Heading,
  SimpleGrid,
  useBreakpointValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import Card from "./card";

export default function CardGrid({ getCurrentUser }) {
  const [card, setCard] = useState([]);

  const toast = useToast();
  const toastPos = useBreakpointValue({ base: "bottom", md: "bottom-right" });
  const toastW = useBreakpointValue({ base: "100%", md: "320px" });
  const toastP = useBreakpointValue({ base: "0 16px 8px", md: "0 8px 8px" });

  useEffect(() => {
    getCardData();

    const realtime = supabase
      .channel("owners")
      .on("postgres_changes", { event: "*", schema: "*" }, () => {
        getCardData();
      })
      .subscribe();
    return () => supabase.removeChannel(realtime);
  });

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
        p={{ base: "24px 24px 48px", md: "48px" }}
        bgColor="white"
        boxShadow="xs"
        rounded="lg"
        gap="20px"
      >
        <Heading size="md" w="100%" alignItems="start">Your Cards</Heading>

        <SimpleGrid
          w="100%"
          columns={[1, 2, 3]}
          spacing="32px"
          justifyItems={{ base: "center", md: "initial" }}
          m="0"
        >
          {card.map((c) => {
            return (
              <Card
                key={c.id}
                name={c.name}
                attr={c.attribute}
                img={c.image}
                id={c.id}
                getCardData={getCardData}
              />
            );
          })}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
