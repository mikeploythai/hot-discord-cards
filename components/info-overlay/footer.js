import { Button, HStack } from "@chakra-ui/react";
import deleteCard from "../../utils/delete-card";

export default function InfoFooter({ id, onClose, publicPage }) {
  const { remove } = deleteCard();

  if (publicPage) {
    return (
      <Button colorScheme="purple" isDisabled>
        Request Trade
      </Button>
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
