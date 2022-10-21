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
import updateProfileData from "../../../../utils/functions/update-profile-data";

export default function EditProfileForm({ userValue, bioValue, isDisabled }) {
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);
  let changes = {};

  let toastProps = {
    toast: useToast(),
    toastPos: useBreakpointValue({ base: "bottom", md: "bottom-right" }),
    toastW: useBreakpointValue({ base: "100%", md: "320px" }),
    toastP: useBreakpointValue({ base: "0 16px 8px", md: "0 8px 8px" }),
  };

  return (
    <VStack align="start" gap={4}>
      <Box w="100%">
        <form
          id="save"
          onSubmit={(e) => {
            e.preventDefault();
            changes["username"] = username || userValue;
            changes["bio"] = bio || bioValue;
            updateProfileData(changes, toastProps);
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
