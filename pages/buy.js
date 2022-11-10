import { GridItem, useMediaQuery } from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";
import Landing from "../components/general/landing";
import Page from "../components/general/page";
import Buy from "../components/buy";
import GameImage from "../components/points/game-grid/sections/game-image";
import Leaderboard from "../components/points/game-grid/sections/leaderboard";
import Powerups from "../components/points/game-grid/sections/powerups";
import getUserData from "../utils/get-user-data";
import BuyGrid from "../components/buy/buy-grid";
import BuyCard from "../components/buy/buy-grid/sections/buy-card";
import UserCard from "../components/buy/buy-grid/sections/user-card";
import Unlocks from "../components/buy/buy-grid/sections/unlocks";

export default function PointsPage() {
  const session = useSession();
  const { userData, getData } = getUserData();
  const [notLandscape] = useMediaQuery("(min-height: 480px)");

  return (
    <Page title="Buy" maxH={{ base: null, sm: notLandscape ? "100vh" : null }}>
      {session ? (
        <Buy>
          <BuyGrid>
            <GridItem area={"buy"}>
              <BuyCard userData={userData} getData={getData} />
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
        <Landing
          title="You must be signed in to view this page."
          subtitle="It's okay, we forgive you."
        />
      )}
    </Page>
  );
}
