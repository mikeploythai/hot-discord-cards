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

export default function BuyRevealOverlay({
  isOpen,
  onClose,
  name,
  attr,
  img,
  own,
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
          <ModalHeader>You have unlocked...</ModalHeader>
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

                  <Text>*insert stats and stuff here*</Text>
                </VStack>

                <HStack
                  display={{ base: "none", md: "flex" }}
                  w="100%"
                  justify="end"
                  gap="8px"
                >
                  <Text
                    display={own ? "initial" : "none"}
                    fontSize="sm"
                    fontWeight="semibold"
                    color="red.500"
                  >
                    You already own this card!
                  </Text>

                  <Button colorScheme="purple" onClick={onClose}>
                    Continue
                  </Button>
                </HStack>
              </VStack>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <HStack display={{ base: "flex", md: "none" }} gap="8px">
              <Text
                display={own ? "initial" : "none"}
                fontSize="sm"
                fontWeight="semibold"
                color="red.500"
              >
                You already own this card!
              </Text>

              <Button colorScheme="purple" onClick={onClose}>
                Continue
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
