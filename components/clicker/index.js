import { Container, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import { supabase } from "../../utils/supabaseClient";
import Spacer from "../general/spacer";
import Game from "./game";
import Leaderboard from "./game/leaderboard";
import Powerups from "./game/powerups";

export default function Clicker() {
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

  async function getCurrentUser() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) throw error;
    if (!session?.user) throw new Error("User not logged in");
    return session.user;
  }

  return (
    <SimpleGrid w="100%" h="fit-content" gap="16px">
      <Spacer />

      <Container maxW="container.lg" p={0}>
        <Grid
          gap="16px"
          templateAreas={{ base: mobileLayout, md: desktopLayout }}
        >
          <GridItem area={"game"}>
            <Game getCurrentUser={getCurrentUser} />
          </GridItem>

          <GridItem area={"powerup"}>
            <Powerups />
          </GridItem>

          <GridItem area={"leaderboard"}>
            <Leaderboard />
          </GridItem>
        </Grid>
      </Container>
    </SimpleGrid>
  );
}
