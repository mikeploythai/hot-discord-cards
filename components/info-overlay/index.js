import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useMediaQuery,
} from "@chakra-ui/react";
import addRandomCard from "../../utils/add-random-card";

export default function InfoOverlay({
  buy,
  isOpen,
  onClose,
  cardData,
  getData,
  children,
}) {
  const { addCard } = addRandomCard();
  const [notLandscape] = useMediaQuery("(min-height: 480px)");
  let gradient;

  if (cardData.level === "common") gradient = "linear(to-br, gray.400, white)";
  else if (cardData.level === "rare")
    gradient = "linear(to-br, yellow.400, white)";
  else if (cardData.level === "super rare")
    gradient = "linear(to-br, green.400, white)";
  else if (cardData.level === "mega rare")
    gradient = "linear(to-br, blue.400, white)";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={() => {
        if (getData && addCard) {
          addCard(cardData);
          getData();
        }
      }}
      size={{ base: "full", md: notLandscape ? "xl" : "full" }}
      isCentered={notLandscape ? true : false}
    >
      <ModalOverlay>
        <ModalContent bgGradient={gradient} rounded="lg" p="6px 4px">
          <ModalHeader>{buy ? "You've unlocked..." : "Card Info"}</ModalHeader>
          <ModalCloseButton size="lg" top={4} right={4} />
          {children}
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
