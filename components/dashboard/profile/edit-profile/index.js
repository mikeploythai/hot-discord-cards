import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export default function EditProfile({ isOpen, onClose, disabled, children }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={["full", "md"]} isCentered>
      <ModalOverlay>
        <ModalContent rounded="lg" m={{ base: 0, md: 4 }}>
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
