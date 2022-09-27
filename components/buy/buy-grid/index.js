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
import BuyCard from "./buy-card";

export default function BuyGrid({ getCurrentUser }) {
  const [points, setPoints] = useState(0);

  const toast = useToast();
  const toastPos = useBreakpointValue(["bottom", "bottom-right"]);
  const toastW = useBreakpointValue(["100%", "320px"]);
  const toastP = useBreakpointValue(["0 16px 8px", "0 8px 8px"]);

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
    <Container maxW="container.md" p={0}>
      <VStack
        p={["24px", "32px"]}
        bgColor="white"
        boxShadow="xs"
        rounded="lg"
        gap="32px"
      >
        <Heading size="md">Available Points: {points}</Heading>
        <SimpleGrid
          columns={[1, 2, 3]}
          spacing="32px"
          justifyItems={["center", "initial"]}
          m={0}
        >
          {cards.map((card) => {
            return (
              <BuyCard
                key={card.key}
                level={card.level}
                color={card.color}
                active={card.active}
                cost={card.cost}
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
