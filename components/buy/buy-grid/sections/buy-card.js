import {
  Button,
  Heading,
  ModalBody,
  ModalFooter,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import addRandomCard from "../../../../utils/add-random-card";
import InfoOverlay from "../../../info-overlay";
import CardInfo from "../../../info-overlay/card-info";
import InfoFooter from "../../../info-overlay/footer";
import Template from "./template";

export default function BuyCard() {
  const user = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addCard, reset, cardData, own } = addRandomCard(user);

  return (
    <Template h="100%" justify="center">
      <Button
        colorScheme="purple"
        color="white"
        w="200px"
        h="300px"
        p="16px"
        rounded="lg"
        transition=".25s ease-in-out"
        onClick={() => {
          addCard();
          onOpen();
        }}
      >
        <VStack>
          <Heading size="md">Unlock a card!</Heading>
          <Text fontSize="sm">We know you want to.</Text>
        </VStack>
      </Button>

      <InfoOverlay
        isOpen={isOpen}
        onClose={onClose}
        cardData={cardData}
        reset={reset}
      >
        <ModalBody>
          <CardInfo cardData={cardData} />
        </ModalBody>

        <ModalFooter>
          <InfoFooter onClose={onClose} own={own} pageType="buy" />
        </ModalFooter>
      </InfoOverlay>
    </Template>
  );
}
