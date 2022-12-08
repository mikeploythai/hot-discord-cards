import { Button, HStack, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import ConfirmationBox from "./confirmation-box";

export default function InfoFooter({ id, onClose, pageType }) {
  const { isOpen, onOpen, onClose: closeAlert } = useDisclosure();
  const cancelRef = useRef();

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
        <Button variant="ghost" colorScheme="red" onClick={onOpen}>
          Release
        </Button>

        <ConfirmationBox
          isOpen={isOpen}
          onClose={onClose}
          closeAlert={closeAlert}
          cancelRef={cancelRef}
          id={id}
        />

        <Button colorScheme="purple" isDisabled>
          Trade
        </Button>
      </HStack>
    );
  }
}
