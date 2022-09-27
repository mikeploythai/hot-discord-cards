import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../../../utils/supabase-client";
import EditProfileForm from "./edit-profile-form";

export default function EditProfileOverlay({
  isOpen,
  onClose,
  userText,
  bioText,
  getCurrentUser,
  getProfileData,
}) {
  const [disabled, isDisabled] = useState(true);

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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={["full", "md"]} isCentered>
      <ModalOverlay>
        <ModalContent rounded="lg" m={[0, "16px"]}>
          <ModalHeader>Edit Profile</ModalHeader>

          <ModalBody>
            <EditProfileForm
              userText={userText}
              bioText={bioText}
              isDisabled={isDisabled}
              getCurrentUser={getCurrentUser}
            />
          </ModalBody>

          <ModalFooter>
            <HStack>
              <Button variant="ghost" rounded="lg" onClick={onClose}>
                Cancel
              </Button>

              <Button
                form="save"
                type="submit"
                colorScheme="purple"
                rounded="lg"
                onClick={onClose}
                disabled={disabled}
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
