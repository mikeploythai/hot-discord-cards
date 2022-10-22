import { useDisclosure } from "@chakra-ui/react";
import { useSession, useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Profile from "../components/profile";
import Landing from "../components/general/landing";
import ProfileCard from "../components/profile/card";
import EditProfile from "../components/profile/edit";
import EditProfileForm from "../components/profile/edit/form";
import getUserData from "../utils/get-user-data";
import Page from "../components/general/page";

export default function Home() {
  const session = useSession();
  const user = useUser();
  const [disabled, isDisabled] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (session) {
    const { userData } = getUserData("*", "id", user.id);

    return (
      <Page title="Dashboard">
        <Profile>
          <ProfileCard userData={userData} onOpen={onOpen} />

          <EditProfile isOpen={isOpen} onClose={onClose} disabled={disabled}>
            <EditProfileForm userData={userData} isDisabled={isDisabled} />
          </EditProfile>
        </Profile>
      </Page>
    );
  } else {
    return (
      <Page>
        <Landing />
      </Page>
    );
  }
}
