import { HStack, Image, Text, useDisclosure, VStack } from "@chakra-ui/react";
import DeleteCardOverlay from "./delete-card-overlay";

export default function Card({ name, attr, img, id, getCardData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      onClick={onOpen}
    >
      <HStack w="100%" justify="space-between">
        <Text fontSize="sm">
          <b>{name}</b>
        </Text>
        <Text fontSize="xs">{attr}</Text>
      </HStack>

      <Image src={img} alt={name} w="100%" h="100%" rounded="md" />
      <DeleteCardOverlay isOpen={isOpen} onClose={onClose} id={id} getCardData={getCardData} />
    </VStack>
  );
}
