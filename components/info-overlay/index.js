import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useMediaQuery,
} from "@chakra-ui/react";

export default function InfoOverlay({
  isOpen,
  onClose,
  cardData,
  reset,
  children,
}) {
  const [notLandscape] = useMediaQuery("(min-height: 480px)");
  let gradient = "";

  if (cardData.level === "common") gradient = "linear(to-br, gray.300, white)";
  else if (cardData.level === "rare")
    gradient = "linear(to-br, yellow.300, white)";
  else if (cardData.level === "super rare")
    gradient = "linear(to-br, green.300, white)";
  else if (cardData.level === "mega rare")
    gradient = "linear(to-br, blue.300, white)";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={reset}
      size={{ base: "full", md: notLandscape ? "xl" : "full" }}
      isCentered={notLandscape ? true : false}
    >
      <ModalOverlay>
        <ModalContent bgGradient={gradient} rounded="lg" p="6px 4px">
          <ModalHeader>Card Info</ModalHeader>
          <ModalCloseButton size="lg" top={4} right={4} />
          {children}
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
