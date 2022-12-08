import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import deleteCard from "../../utils/delete-card";

export default function ConfirmationBox({
  isOpen,
  onClose,
  closeAlert,
  cancelRef,
  id,
}) {
  const { remove } = deleteCard();
  const [loading, isLoading] = useState(false);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={closeAlert}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent m={8}>
          <AlertDialogHeader fontSize="lg">Release Card</AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter as={HStack}>
            <Button variant="ghost" ref={cancelRef} onClick={closeAlert}>
              Cancel
            </Button>

            <Button
              colorScheme="red"
              onClick={() => {
                isLoading(true);
                setTimeout(() => {
                  closeAlert();
                  onClose();
                  remove(id);
                }, 500);
              }}
              isLoading={loading}
            >
              Release
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
