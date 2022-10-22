import { Button, HStack } from "@chakra-ui/react";
import deleteCard from "../../utils/delete-card";

export default function InfoFooter({ id, display }) {
  const { remove } = deleteCard();

  return (
    <HStack display={display}>
      <Button
        variant="ghost"
        colorScheme="red"
        rounded="lg"
        onClick={() => remove(id)}
      >
        Delete
      </Button>

      <Button colorScheme="purple" rounded="lg" isDisabled>
        Trade
      </Button>
    </HStack>
  );
}
