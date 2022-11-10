import { Button, HStack, Text } from "@chakra-ui/react";
import deleteCard from "../../utils/delete-card";

export default function InfoFooter({ id, onClose, own, pageType }) {
  const { remove } = deleteCard();

  if (pageType === "public") {
    return (
      <Button colorScheme="purple" isDisabled>
        Request Trade
      </Button>
    );
  } else if (pageType === "buy") {
    return (
      <HStack>
        <Text
          fontSize="sm"
          fontWeight="semibold"
          color="red.500"
          opacity={own ? 1 : 0}
          transition="200ms ease-in-out"
        >
          You already own this card!
        </Text>

        <Button colorScheme="purple" onClick={onClose}>
          Continue
        </Button>
      </HStack>
    );
  } else {
    return (
      <HStack>
        <Button
          variant="outline"
          colorScheme="red"
          onClick={onClose}
          onClickCapture={() => remove(id)}
        >
          Delete
        </Button>

        <Button colorScheme="purple" isDisabled>
          Trade
        </Button>
      </HStack>
    );
  }
}
