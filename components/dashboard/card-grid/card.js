import { Image, useDisclosure } from "@chakra-ui/react";
import CardInfoOverlay from "../../card-info-overlay";

export default function Card({ name, attr, img, id, getCardData, getCurrentUser }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Image
        src={img}
        alt={name}
        maxW="200px"
        w="100%"
        h={["250px", "300px"]}
        rounded="lg"
        filter="auto"
        brightness="50%"
        transition=".25s ease-in-out"
        onClick={onOpen}
        _hover={{
          brightness: "100%",
          cursor: "pointer",
        }}
      />

      <CardInfoOverlay
        header="Card Info"
        isOpen={isOpen}
        onClose={onClose}
        buy={false}
        name={name}
        img={img}
        attr={attr}
        id={id}
        getCardData={getCardData}
        getCurrentUser={getCurrentUser}
      />
    </>
  );
}
