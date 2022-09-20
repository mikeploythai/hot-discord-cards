import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";

export default function EditProfileOverlay({
  isOpen,
  onClose,
  userText,
  bioText,
  getCurrentUser,
  getProfileData,
}) {
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const toast = useToast();
  const toastPos = useBreakpointValue({ base: "bottom", md: "bottom-right" });
  const toastW = useBreakpointValue({ base: "100%", md: "320px" });
  const toastP = useBreakpointValue({ base: "0 16px 8px", md: "0 8px 8px" });

  useEffect(() => {
    getProfileData();

    const realtime = supabase
      .channel("profiles")
      .on("postgres_changes", { event: "*", schema: "*" }, () => {
        getProfileData();
      })
      .subscribe();
    return () => supabase.removeChannel(realtime);
  });

  async function updateProfileData() {
    try {
      const user = await getCurrentUser();

      const updates = {
        id: user.id,
        username: username || userText,
        bio: bio || bioText,
        updated_at: new Date(),
      };

      if (updates.bio === " ") {
        updates.bio = null;
      }

      let { error } = await supabase
        .from("profiles")
        .upsert(updates, { returning: "minimal" });
      if (error) throw error;
    } catch (error) {
      toast({
        title: "Error!",
        description: error.message,
        status: "error",
        position: toastPos,
        containerStyle: {
          w: toastW,
          p: toastP,
        },
        isClosable: true,
      });
    } finally {
      toast({
        title: "Success!",
        description: "Your profile was saved.",
        status: "success",
        position: toastPos,
        containerStyle: {
          w: toastW,
          p: toastP,
        },
        isClosable: true,
      });
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "xs", md: "md" }}
      isCentered
    >
      <ModalOverlay>
        <ModalContent rounded="lg" m="16px">
          <ModalHeader>Edit Profile</ModalHeader>

          <ModalBody>
            <VStack align="start" gap="16px">
              <Box w="100%">
                <form
                  id="test"
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateProfileData();
                    setDisabled(true);
                  }}
                >
                  <VStack gap="8px">
                    <FormControl>
                      <FormLabel>Username</FormLabel>

                      <Editable defaultValue={userText}>
                        <Input
                          as={EditablePreview}
                          variant="filled"
                          pt="6px"
                          fontSize={{ base: "sm", md: "md" }}
                        />

                        <Input
                          as={EditableInput}
                          variant="filled"
                          fontSize={{ base: "sm", md: "md" }}
                          onChange={(e) => {
                            setUsername(e.target.value);
                            setDisabled(false);
                          }}
                          _focusVisible={{
                            bgColor: "white",
                            boxShadow: "0 0 0 2px #3182ce",
                          }}
                        />
                      </Editable>

                      <FormHelperText>
                        Usernames must be more than 2 letters!
                      </FormHelperText>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Bio</FormLabel>

                      <Editable defaultValue={bioText}>
                        <Input
                          as={EditablePreview}
                          variant="filled"
                          whiteSpace="pre-wrap"
                          minH="80px"
                          fontSize={{ base: "sm", md: "md" }}
                          overflow="scroll"
                        />

                        <Input
                          as={EditableTextarea}
                          variant="filled"
                          minH="80px"
                          maxLength={100}
                          resize="none"
                          fontSize={{ base: "sm", md: "md" }}
                          onChange={(e) => {
                            if (e.target.value.length === 0) setBio(" ");
                            else setBio(e.target.value);
                            setDisabled(false);
                          }}
                          _focusVisible={{
                            bgColor: "white",
                            boxShadow: "0 0 0 2px #3182ce",
                          }}
                        />
                      </Editable>

                      <FormHelperText>
                        Bios can be 100 characters max!
                      </FormHelperText>
                    </FormControl>
                  </VStack>
                </form>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <HStack>
              <Button
                variant="ghost"
                onClick={onClose}
                onClickCapture={() => setDisabled(true)}
              >
                Cancel
              </Button>

              <Button
                form="test"
                type="submit"
                colorScheme="purple"
                onClick={onClose}
                isDisabled={disabled}
              >
                Save
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
