import { GridItem, useMediaQuery } from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";
import Landing from "../components/general/landing";
import Page from "../components/general/page";
import Buy from "../components/buy";
import getUserData from "../utils/get-user-data";
import BuyGrid from "../components/buy/buy-grid";
import BuyCard from "../components/buy/buy-grid/sections/buy-card";
import UserCard from "../components/buy/buy-grid/sections/user-card";
import Unlocks from "../components/buy/buy-grid/sections/unlocks";

export default function BuyPage() {
  const session = useSession();
  const { userData } = getUserData();
  const [notLandscape] = useMediaQuery("(min-height: 480px)");

  return (
    <Page
      title="Unlock"
      maxH={{ base: null, sm: notLandscape ? "100vh" : null }}
    >
      {session ? (
        <Buy>
          <BuyGrid>
            <GridItem area={"buy"}>
              <BuyCard />
            </GridItem>

            <GridItem area={"user"}>
              <UserCard data={userData} link="/" />
            </GridItem>

            <GridItem area={"unlocks"}>
              <Unlocks />
            </GridItem>
          </BuyGrid>
        </Buy>
      ) : (
        <Landing notHome={true} />
      )}
    </Page>
  );
}
