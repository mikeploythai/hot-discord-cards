import { Button, HStack } from "@chakra-ui/react";
import deleteCard from "../../utils/delete-card";

export default function InfoFooter({ id, onClose, pageType }) {
  const { remove } = deleteCard();

  if (pageType === "public") {
    return (
      <Button colorScheme="purple" isDisabled>
        Request Trade
      </Button>
    );
  } else if (pageType === "buy") {
    return (
      <Button colorScheme="purple" onClick={onClose}>
        Continue
      </Button>
    );
  } else {
    return (
      <HStack>
        <Button
          variant="outline"
          colorScheme="red"
          onClick={() => {
            onClose();
            remove(id);
          }}
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
