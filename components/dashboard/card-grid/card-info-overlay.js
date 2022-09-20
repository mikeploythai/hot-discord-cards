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
  useBreakpointValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { supabase } from "../../../utils/supabaseClient";

export default function CardInfoOverlay({
  isOpen,
  onClose,
  name,
  img,
  attr,
  id,
  getCardData,
}) {
  const toast = useToast();
  const toastPos = useBreakpointValue({ base: "bottom", md: "bottom-right" });
  const toastW = useBreakpointValue({ base: "100%", md: "320px" });
  const toastP = useBreakpointValue({ base: "0 16px 8px", md: "0 8px 8px" });

  async function deleteCard(id) {
    try {
      let { error } = await supabase
        .from("owners")
        .delete()
        .match({ card_id: id });
      if (error) throw error;
    } catch (error) {
      toast({
        title: "Error!",
        description: error.message,
        status: "error",
        position: toastPos,
        containerStyle: {
          w: toastW,
          p: toastP,
        },
        isClosable: true,
      });
    } finally {
      getCardData();
      toast({
        title: "Success!",
        description: "The card was deleted.",
        status: "success",
        position: toastPos,
        containerStyle: {
          w: toastW,
          p: toastP,
        },
        isClosable: true,
      });
    }
  }

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

                  <Text>*insert stats and stuff here*</Text>
                </VStack>

                <HStack
                  display={{ base: "none", md: "flex" }}
                  w="100%"
                  justify="end"
                >
                  <Button
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => deleteCard(id)}
                  >
                    Delete
                  </Button>

                  <Button colorScheme="purple" isDisabled>
                    Trade
                  </Button>
                </HStack>
              </VStack>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <HStack display={{ base: "initial", md: "none" }}>
              <Button
                variant="ghost"
                colorScheme="red"
                onClick={() => deleteCard(id)}
              >
                Delete
              </Button>

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
