import {
  Button,
  Heading,
  ModalBody,
  ModalFooter,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import getCardData from "../../../../utils/get-card-data";
import getUserData from "../../../../utils/get-user-data";
import { updateUserData } from "../../../../utils/update-user-data";
import InfoOverlay from "../../../info-overlay";
import CardInfo from "../../../info-overlay/card-info";
import InfoFooter from "../../../info-overlay/footer";
import Template from "./template";

export default function BuyCard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userData, getData } = getUserData();
  const { updateData } = updateUserData();
  const { cardData, getData: getCard } = getCardData("*", "", "");
  const [loading, isLoading] = useState(false);

  const data = {
    userData: userData,
    cardData: cardData,
    getCard: getCard,
  };

  useEffect(() => {
    getData();
  }, [userData]);

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
          isLoading(true);
          updateData({ points: userData.points - 250 }, true);
          setTimeout(() => {
            onOpen();
            isLoading(false);
          }, 1000);
        }}
        isDisabled={!userData || userData.points < 250 ? true : false}
        isLoading={loading}
      >
        <VStack>
          <Heading size="md">Unlock a card!</Heading>
          <Text fontSize="sm">250 Dabloons</Text>
        </VStack>
      </Button>

      <InfoOverlay buy={true} isOpen={isOpen} onClose={onClose} data={data}>
        <ModalBody>
          <CardInfo cardData={cardData} />
        </ModalBody>

        <ModalFooter>
          <InfoFooter onClose={onClose} pageType="buy" />
        </ModalFooter>
      </InfoOverlay>
    </Template>
  );
}
