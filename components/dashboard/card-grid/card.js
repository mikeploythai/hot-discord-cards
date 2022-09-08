import {
  HStack,
  Image,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import { supabase } from "../../../utils/supabaseClient";

export default function Card({ name, attr, img, id }) {
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
    <VStack
      bgColor="white"
      maxW="200px"
      w="100%"
      h="300px"
      p="16px"
      rounded="lg"
      boxShadow="xs"
      transition=".25s ease-in-out"
      _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
      onClick={() => deleteCard(id)}
    >
      <HStack w="100%" justify="space-between">
        <Text fontSize="sm">
          <b>{name}</b>
        </Text>
        <Text fontSize="xs">{attr}</Text>
      </HStack>

      <Image src={img} alt={name} w="100%" h="100%" rounded="md" />
    </VStack>
  );
}
