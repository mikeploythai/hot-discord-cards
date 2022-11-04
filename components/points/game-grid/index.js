import { Container, Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import getUserData from "../../../utils/get-user-data";
import GameImage from "./sections/game-image";
import Leaderboard from "./sections/leaderboard";
import Powerups from "./sections/powerups";

export default function GameGrid() {
  const [notLandscape] = useMediaQuery("(min-height: 480px)");
  const { userData } = getUserData();

  const desktopLayout = `
  "powerup leaderboard"
  "game leaderboard"
`;

  const mobileLayout = `
  "powerup"
  "game"
  "leaderboard"
`;

  return (
    <Container maxW="container.lg" minH={0} p={0}>
      <Grid
        templateAreas={{
          base: mobileLayout,
          lg: notLandscape ? desktopLayout : mobileLayout,
        }}
        templateColumns={{ base: null, lg: notLandscape ? "1fr 30%" : null }}
        templateRows={"min-content 1fr"}
        h="100%"
        gap={4}
      >
        <GridItem area={"game"}>
          <GameImage />
        </GridItem>

        <GridItem area={"powerup"}>
          <Powerups userData={userData} />
        </GridItem>

        <GridItem area={"leaderboard"}>
          <Leaderboard userData={userData} />
        </GridItem>
      </Grid>
    </Container>
  );
}
