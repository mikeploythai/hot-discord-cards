import {
  Container,
  Heading,
  SimpleGrid,
  useBreakpointValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import BuyCard from "./buy-card";

export default function BuyGrid({ getCurrentUser }) {
  const cards = [
    {
      level: "bronze",
      color: "orange.800",
      active: "orange.700",
      cost: 250,
      key: 1,
    },
    {
      level: "silver",
      color: "gray.500",
      active: "gray.400",
      cost: 500,
      key: 2,
    },
    {
      level: "gold",
      color: "yellow.500",
      active: "yellow.400",
      cost: 1000,
      key: 3,
    },
  ];
  const [points, setPoints] = useState(0);

  const toast = useToast();
  const toastPos = useBreakpointValue({ base: "bottom", md: "bottom-right" });
  const toastW = useBreakpointValue({ base: "100%", md: "320px" });
  const toastP = useBreakpointValue({ base: "0 16px 8px", md: "0 8px 8px" });

  useEffect(() => {
    getPointData();
  });

  async function getPointData() {
    try {
      const user = await getCurrentUser();

      let { data, error } = await supabase
        .from("profiles")
        .select("points")
        .eq("id", user.id)
        .maybeSingle();
      if (error) throw error;

      if (data) setPoints(data.points);
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
    <Container maxW="container.lg" p="0">
      <VStack
        p={{ base: "24px", md: "48px" }}
        bgColor="white"
        boxShadow="xs"
        rounded="lg"
        gap={{ base: "16px", md: "32px" }}
      >
        <Heading size="md">Available Points: {points}</Heading>

        <SimpleGrid
          columns={[1, 2, 3]}
          spacing="32px"
          justifyItems={{ base: "center", md: "initial" }}
          m="0"
        >
          {cards.map((c) => {
            return (
              <BuyCard
                key={c.key}
                level={c.level}
                color={c.color}
                active={c.active}
                cost={c.cost}
                points={points}
                getPointData={getPointData}
                getCurrentUser={getCurrentUser}
              />
            );
          })}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
