import { Image, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
import InfoOverlay from "../../info-overlay";
import CardInfo from "../../info-overlay/card-info";
import InfoFooter from "../../info-overlay/footer";

export default function Card({ cardData, publicPage }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Image
        src={cardData.image}
        alt={cardData.name}
        w="100%"
        h={{ base: "250px", md: "300px" }}
        rounded="md"
        filter="auto"
        brightness="50%"
        transition="200ms ease-in-out"
        onClick={onOpen}
        _hover={{
          brightness: "100%",
          cursor: "pointer",
        }}
      />

      <InfoOverlay isOpen={isOpen} onClose={onClose}>
        <ModalBody>
          <CardInfo cardData={cardData} />
        </ModalBody>

        <ModalFooter>
          <InfoFooter
            id={cardData.id}
            onClose={onClose}
            publicPage={publicPage}
          />
        </ModalFooter>
      </InfoOverlay>
    </>
  );
}
