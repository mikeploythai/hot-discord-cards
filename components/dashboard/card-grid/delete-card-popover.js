import {
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { supabase } from "../../../utils/supabaseClient";

export default function DeleteCardPopover({ onModalClose, id, getCardData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button variant="ghost">Delete</Button>
      </PopoverTrigger>

      <PopoverContent m="0 16px">
        <PopoverArrow />
        <PopoverHeader fontWeight="medium" border="none">Are you sure?</PopoverHeader>

        <PopoverBody>
          <HStack>
            <Button variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>

            <Button
              size="sm"
              colorScheme="red"
              onClick={onModalClose}
              onClickCapture={() => deleteCard(id)}
            >
              Confirm
            </Button>
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
