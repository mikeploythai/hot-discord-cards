import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useMediaQuery,
} from "@chakra-ui/react";

export default function EditProfile({ isOpen, onClose, disabled, children }) {
  const [notLandscape] = useMediaQuery("(min-height: 480px)");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "full", md: notLandscape ? "md" : "full" }}
      isCentered={notLandscape ? true : false}
    >
      <ModalOverlay>
        <ModalContent rounded="lg" p="6px 4px">
          <ModalHeader>Edit Profile</ModalHeader>

          <ModalBody>{children}</ModalBody>

          <ModalFooter>
            <HStack>
              <Button variant="ghost" rounded="lg" onClick={onClose}>
                Cancel
              </Button>

              <Button
                form="save"
                type="submit"
                colorScheme="purple"
                rounded="lg"
                onClick={onClose}
                disabled={disabled}
              >
                Save
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
