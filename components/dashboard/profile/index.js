import { Container, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import getProfileData from "../../../utils/hooks/get-profile-data";
import ProfileCard from "./card";
import EditProfile from "./edit-profile";
import EditProfileForm from "./edit-profile/form";

export default function Profile({ session }) {
  const [disabled, isDisabled] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userData } = getProfileData(session);

  return (
    <Container maxW="container.md" p={0}>
      <ProfileCard userData={userData} onOpen={onOpen} />
      <EditProfile isOpen={isOpen} onClose={onClose} disabled={disabled}>
        <EditProfileForm
          userValue={!userData ? null : userData.username}
          bioValue={!userData ? null : userData.bio}
          isDisabled={isDisabled}
        />
      </EditProfile>
    </Container>
  );
}
