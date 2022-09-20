import {
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import DeleteCardPopover from "./delete-card-popover";

export default function CardInfoOverlay({
  isOpen,
  onClose,
  name,
  img,
  attr,
  id,
  getCardData,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "full", md: "4xl" }}
      isCentered
    >
      <ModalOverlay>
        <ModalContent rounded="2xl" m={{ base: "0", md: "16px" }} zIndex={2}>
          <ModalHeader>Card Info</ModalHeader>
          <ModalCloseButton size="lg" />

          <ModalBody>
            <Flex direction={{ base: "column", md: "row" }} gap="24px">
              <Image
                src={img}
                alt={name}
                w="auto"
                h={{ base: "200px", md: "480px" }}
                rounded="lg"
              />

              <VStack
                w="100%"
                h={{ base: "200px", md: "480px" }}
                justify="space-between"
                align="start"
              >
                <VStack w="100%" align="start" gap="32px">
                  <VStack align="start">
                    <Heading>{name}</Heading>
                    <Heading size="md" fontWeight="medium">
                      attribute: {attr}
                    </Heading>
                  </VStack>

                  <Text>// insert stats and stuff here</Text>
                </VStack>

                <HStack
                  display={{ base: "none", md: "flex" }}
                  w="100%"
                  justify="end"
                >
                  <DeleteCardPopover
                    onModalClose={onClose}
                    id={id}
                    getCardData={getCardData}
                  />

                  <Button colorScheme="purple" isDisabled>
                    Trade
                  </Button>
                </HStack>
              </VStack>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <HStack display={{ base: "initial", md: "none" }}>
              <DeleteCardPopover
                onModalClose={onClose}
                id={id}
                getCardData={getCardData}
              />

              <Button colorScheme="purple" isDisabled>
                Trade
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
