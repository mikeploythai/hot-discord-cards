import {
  Button,
  Container,
  Heading,
  SimpleGrid,
  useBreakpointValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function BuyGrid({ getCurrentUser }) {
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

  async function updatePointData(cost) {
    try {
      const user = await getCurrentUser();

      const updates = {
        id: user.id,
        points: points - cost,
        updated_at: new Date(),
      };

      let { error } = await supabase
        .from("profiles")
        .upsert(updates, { returning: "minimal" });
      if (error) throw error;
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
    } finally {
      getPointData();
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
          <Button
            bgColor="orange.800"
            color="white"
            w="200px"
            h="300px"
            p="16px"
            rounded="lg"
            boxShadow="xs"
            transition=".25s ease-in-out"
            _hover={{ transform: points >= 250 ? "scale(1.05)" : "unset" }}
            onClick={() => updatePointData(250)}
            isDisabled={points >= 250 ? false : true}
          >
            Bronze Pack<br></br>250 Points
          </Button>

          <Button
            bgColor="gray.400"
            w="200px"
            h="300px"
            p="16px"
            rounded="lg"
            boxShadow="xs"
            transition=".25s ease-in-out"
            _hover={{ transform: points >= 500 ? "scale(1.05)" : "unset" }}
            onClick={() => updatePointData(500)}
            isDisabled={points >= 500 ? false : true}
          >
            Silver Pack<br></br>500 Points
          </Button>

          <Button
            bgColor="yellow.400"
            w="200px"
            h="300px"
            p="16px"
            rounded="lg"
            boxShadow="xs"
            transition=".25s ease-in-out"
            _hover={{ transform: points >= 1000 ? "scale(1.05)" : "unset" }}
            onClick={() => updatePointData(1000)}
            isDisabled={points >= 1000 ? false : true}
          >
            Gold Pack<br></br>1000 Points
          </Button>
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
