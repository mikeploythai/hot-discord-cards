import { Container, Grid, GridItem } from "@chakra-ui/react";
import Game from "./grid-section/game";
import Leaderboard from "./grid-section/leaderboard";
import Powerups from "./grid-section/powerups";

export default function GameGrid({ session, getCurrentUser }) {
  const desktopLayout = `
    "game game leaderboard"
    "game game leaderboard"
    "powerup powerup powerup"
  `;

  const mobileLayout = `
    "leaderboard"
    "game"
    "powerup"
  `;

  return (
    <Container maxW="container.lg" p={0}>
      <Grid gap="16px" templateAreas={[mobileLayout, desktopLayout]}>
        <GridItem area={"game"}>
          <Game session={session} getCurrentUser={getCurrentUser} />
        </GridItem>

        <GridItem area={"powerup"}>
          <Powerups />
        </GridItem>
        
        <GridItem area={"leaderboard"}>
          <Leaderboard />
        </GridItem>
      </Grid>
    </Container>
  );
}
