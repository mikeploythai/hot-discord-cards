import { Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import OverlayFooter from "./overlay-footer";

export default function CardInfo({
  onClose,
  gap,
  buy,
  name,
  img,
  attr,
  id,
  getCardData,
  own,
  reset,
}) {
  return (
    <Flex direction="column" gap="16px">
      <Image src={img} alt={name} w="auto" h="200px" rounded="lg" />

      <VStack w="100%" h="auto" justify="space-between" align="start">
        <VStack w="100%" align="start" gap="32px">
          <VStack align="start">
            <Heading>{name}</Heading>

            <Heading size={["sm", "md"]} fontWeight="medium">
              Attribute: {attr}
            </Heading>
          </VStack>

          <Text>*insert stats and stuff here*</Text>
        </VStack>

        <OverlayFooter
          base="none"
          md="flex"
          w="100%"
          justify="end"
          onClose={onClose}
          gap={gap}
          buy={buy}
          id={id}
          getCardData={getCardData}
          own={own}
          reset={reset}
        />
      </VStack>
    </Flex>
  );
}
