import { GridItem, useMediaQuery } from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";
import Landing from "../components/general/landing";
import Page from "../components/general/page";
import Points from "../components/points";
import GameGrid from "../components/points/game-grid";
import GameImage from "../components/points/game-grid/sections/game-image";
import Leaderboard from "../components/points/game-grid/sections/leaderboard";
import PowerUps from "../components/points/game-grid/sections/powerups";
import getUserData from "../utils/get-user-data";

export default function PointsPage() {
  const session = useSession();
  const { userData, getData } = getUserData();
  const [notLandscape] = useMediaQuery("(min-height: 480px)");

  return (
    <Page
      title="Dabloons"
      maxH={{ base: null, sm: notLandscape ? "100vh" : null }}
    >
      {session ? (
        <Points>
          <GameGrid>
            <GridItem area={"game"}>
              <GameImage userData={userData} getData={getData} />
            </GridItem>

            <GridItem area={"powerup"}>
              <PowerUps userData={userData} />
            </GridItem>

            <GridItem area={"leaderboard"}>
              <Leaderboard userData={userData} />
            </GridItem>
          </GameGrid>
        </Points>
      ) : (
        <Landing notHome={true} />
      )}
    </Page>
  );
}
