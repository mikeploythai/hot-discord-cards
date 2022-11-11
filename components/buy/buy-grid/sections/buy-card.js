import {
  Button,
  Heading,
  ModalBody,
  ModalFooter,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import getCardData from "../../../../utils/get-card-data";
import getUserData from "../../../../utils/get-user-data";
import InfoOverlay from "../../../info-overlay";
import CardInfo from "../../../info-overlay/card-info";
import InfoFooter from "../../../info-overlay/footer";
import Template from "./template";

export default function BuyCard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userData } = getUserData();
  const { cardData, getData } = getCardData("*", "", "");

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
        onClick={onOpen}
        isDisabled={!userData || userData.points < 500 ? true : false}
      >
        <VStack>
          <Heading size="md">Unlock a card!</Heading>
          <Text fontSize="sm">500 Points</Text>
        </VStack>
      </Button>

      <InfoOverlay
        buy={true}
        isOpen={isOpen}
        onClose={onClose}
        getData={getData}
        cardData={cardData}
      >
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
