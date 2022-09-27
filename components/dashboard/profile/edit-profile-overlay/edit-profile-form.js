import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  useBreakpointValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../../../../utils/supabase-client";

export default function EditProfileForm({
  userText,
  bioText,
  isDisabled,
  getCurrentUser,
}) {
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);

  const toast = useToast();
  const toastPos = useBreakpointValue(["bottom", "bottom-right"]);
  const toastW = useBreakpointValue(["100%", "320px"]);
  const toastP = useBreakpointValue(["0 16px 8px", "0 8px 8px"]);

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
        updates.bio = "";
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
    <VStack align="start" gap="16px">
      <Box w="100%">
        <form
          id="save"
          onSubmit={(e) => {
            e.preventDefault();
            updateProfileData();
            isDisabled(true);
          }}
        >
          <VStack gap="8px">
            <FormControl>
              <FormLabel>Username</FormLabel>

              <Editable defaultValue={userText}>
                <Input
                  as={EditablePreview}
                  variant="filled"
                  pt={["8px", "6px"]}
                  fontSize={["sm", "md"]}
                  rounded="lg"
                />

                <Input
                  as={EditableInput}
                  variant="filled"
                  fontSize={["sm", "md"]}
                  rounded="lg"
                  _focusVisible={{
                    bgColor: "white",
                    boxShadow: "0 0 0 2px #3182ce",
                  }}
                  onChange={(e) => {
                    isDisabled(false);
                    setUsername(e.target.value);
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
                  minH="100px"
                  fontSize={["sm", "md"]}
                  pt={["8px", "6px"]}
                  overflow="scroll"
                  rounded="lg"
                />

                <Input
                  as={EditableTextarea}
                  variant="filled"
                  minH="100px"
                  maxLength={100}
                  resize="none"
                  fontSize={["sm", "md"]}
                  pt={["8px", "6px"]}
                  rounded="lg"
                  _focusVisible={{
                    bgColor: "white",
                    boxShadow: "0 0 0 2px #3182ce",
                  }}
                  onChange={(e) => {
                    isDisabled(false);

                    if (e.target.value.length === 0) setBio(" ");
                    else setBio(e.target.value);
                  }}
                />
              </Editable>

              <FormHelperText>Bios can be 100 characters max!</FormHelperText>
            </FormControl>
          </VStack>
        </form>
      </Box>
    </VStack>
  );
}
