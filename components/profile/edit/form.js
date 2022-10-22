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
import { updateUserData } from "../../../utils/update-user-data";

export default function EditProfileForm({ userData, isDisabled }) {
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);
  const { updateData } = updateUserData();

  return (
    <VStack align="start" gap={4}>
      <Box w="100%">
        <form
          id="save"
          onSubmit={(e) => {
            e.preventDefault();
            updateData({
              username: username || userData.username,
              bio: bio || userData.bio,
            });
            isDisabled(true);
          }}
        >
          <VStack gap={2}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Editable defaultValue={userData.username}>
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
              <Editable defaultValue={userData.bio}>
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
