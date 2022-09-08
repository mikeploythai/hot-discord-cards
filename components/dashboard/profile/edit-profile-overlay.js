import {
  Box,
  Button,
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
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
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

  async function updateProfileData() {
    try {
      const user = await getCurrentUser();

      const updates = {
        id: user.id,
        username: username || userText,
        bio: bio || bioText,
        updated_at: new Date(),
      };

      if (updates.bio === "clear" || updates.bio === "Clear") {
        updates.bio = null;
      }

      let { error } = await supabase
        .from("profiles")
        .upsert(updates, { returning: "minimal" });
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      getProfileData();
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
        <ModalContent rounded="lg">
          <ModalHeader>Edit Profile</ModalHeader>

          <ModalBody>
            <VStack align="start" gap="16px">
              <Box w="100%">
                <form
                  id="test"
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateProfileData();
                  }}
                >
                  <VStack gap="8px">
                    <FormControl>
                      <FormLabel>Username</FormLabel>
                      <Input
                        variant="filled"
                        placeholder={userText}
                        fontSize={{ base: "sm", md: "md" }}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <FormHelperText>
                        Make sure it&apos;s more than 2 letters!
                      </FormHelperText>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Bio</FormLabel>
                      <Input
                        as={Textarea}
                        variant="filled"
                        placeholder={bioText}
                        resize="none"
                        fontSize={{ base: "sm", md: "md" }}
                        border="none"
                        outline="none"
                        onChange={(e) => setBio(e.target.value)}
                        _focusVisible={{
                          bgColor: "white",
                          boxShadow: "0 0 0 2px #3182ce",
                        }}
                      />
                      <FormHelperText>
                        Type &apos;clear&apos; to delete your bio.
                      </FormHelperText>
                    </FormControl>
                  </VStack>
                </form>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <HStack>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>

              <Button
                form="test"
                type="submit"
                colorScheme="purple"
                onClick={onClose}
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
