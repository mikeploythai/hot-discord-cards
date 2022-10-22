import { Image } from "@chakra-ui/react";

export default function Card({ cardData, onOpen }) {
  return (
    <Image
      src={cardData.image}
      alt={cardData.name}
      maxW="200px"
      w="100%"
      h={{ base: "250px", md: "300px" }}
      rounded={{ base: "md", md: "lg" }}
      filter="auto"
      brightness="50%"
      transition="200ms ease-in-out"
      // onClick={onOpen}
      _hover={{
        brightness: "100%",
        cursor: "pointer",
      }}
    />
  );
}
