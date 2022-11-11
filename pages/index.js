import { Skeleton, useDisclosure } from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Profile from "../components/profile";
import Landing from "../components/general/landing";
import ProfileCard from "../components/profile/card";
import EditProfile from "../components/profile/edit";
import EditProfileForm from "../components/profile/edit/form";
import getUserData from "../utils/get-user-data";
import Page from "../components/general/page";
import CardGrid from "../components/profile/card-grid";
import getCardData from "../utils/get-card-data";
import Card from "../components/profile/card-grid/card";

export default function HomePage() {
  const session = useSession();
  const [disabled, isDisabled] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userData } = getUserData();
  const { cardData } = getCardData("*, owners!inner (*)", "owners.user_id");

  return (
    <Page title={!session ? null : "Dashboard"}>
      {!session ? (
        <Landing />
      ) : (
        <Profile>
          <ProfileCard userData={userData} onOpen={onOpen} />

          <EditProfile isOpen={isOpen} onClose={onClose} disabled={disabled}>
            <EditProfileForm userData={userData} isDisabled={isDisabled} />
          </EditProfile>

          <CardGrid word="Your">
            {cardData.map((card) => {
              return (
                <Skeleton key={card.id} rounded="md" isLoaded={card}>
                  <Card cardData={card} />
                </Skeleton>
              );
            })}
          </CardGrid>
        </Profile>
      )}
    </Page>
  );
}
