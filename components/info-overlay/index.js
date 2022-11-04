import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useMediaQuery,
} from "@chakra-ui/react";

export default function InfoOverlay({ isOpen, onClose, children }) {
  const [notLandscape] = useMediaQuery("(min-height: 480px)");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "full", md: notLandscape ? "xl" : "full" }}
      isCentered={notLandscape ? true : false}
    >
      <ModalOverlay>
        <ModalContent rounded="lg" p="6px 4px">
          <ModalHeader>Card Info</ModalHeader>
          <ModalCloseButton size="lg" top={4} right={4} />
          {children}
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
