import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { supabase } from "../../../utils/supabaseClient";

export default function DeleteCardOverlay({
  isOpen,
  onClose,
  id,
  getCardData,
}) {
  const toast = useToast();
  const cancelRef = useRef();

  async function deleteCard(id) {
    try {
      let { error } = await supabase
        .from("owners")
        .delete()
        .match({ card_id: id });
      if (error) throw error;
    } catch (error) {
      toast({
        title: "Error!",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    } finally {
      getCardData();
    }
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      size={{ base: "xs", md: "md" }}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent rounded="lg">
          <AlertDialogHeader>Delete Card</AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can&apos;t undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <HStack>
              <Button
                ref={cancelRef}
                onClick={onClose}
                variant="ghost"
                _focusVisible={{ boxShadow: "0 0 0 2px #3182ce" }}
              >
                Cancel
              </Button>

              <Button
                colorScheme="red"
                onClick={onClose}
                onClickCapture={() => deleteCard(id)}
              >
                Delete
              </Button>
            </HStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
