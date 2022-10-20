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
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../../../../utils/supabase-client";
import getCurrentUser from "../../../../utils/hooks/get-current-user";

export default function EditProfileForm({ userValue, bioValue, isDisabled }) {
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);

  async function updateProfileData() {
    try {
      const user = await getCurrentUser();

      const updates = {
        id: user.id,
        username: username || userValue,
        bio: bio || bioValue,
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
      console.log(error.message);
    }
  }

  return (
    <VStack align="start" gap={4}>
      <Box w="100%">
        <form
          id="save"
          onSubmit={(e) => {
            e.preventDefault();
            updateProfileData();
            isDisabled(true);
          }}
        >
          <VStack gap={2}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Editable defaultValue={userValue}>
                <Input
                  as={EditablePreview}
                  variant="filled"
                  pt={{ base: 2, md: 1.5 }}
                  fontSize={{ base: "sm", md: "md" }}
                  rounded="lg"
                />
                <Input
                  as={EditableInput}
                  variant="filled"
                  fontSize={{ base: "sm", md: "md" }}
                  rounded="lg"
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
              <Editable defaultValue={bioValue}>
                <Input
                  as={EditablePreview}
                  variant="filled"
                  minH="8rem"
                  pt={{ base: 2, md: 1.5 }}
                  fontSize={{ base: "sm", md: "md" }}
                  whiteSpace="pre-wrap"
                  overflow="auto"
                  rounded="lg"
                />
                <Input
                  as={EditableTextarea}
                  variant="filled"
                  minH="8rem"
                  maxLength={100}
                  pt={{ base: 2, md: 1.5 }}
                  fontSize={{ base: "sm", md: "md" }}
                  resize="none"
                  rounded="lg"
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
