import { Container, Grid, useMediaQuery } from "@chakra-ui/react";

export default function BuyGrid({ children }) {
  const [notLandscape] = useMediaQuery("(min-height: 480px)");

  const desktopLayout = `
    "user unlocks"
    "buy unlocks"
  `;

  const mobileLayout = `
    "user"
    "buy"
    "unlocks"
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
        {children}
      </Grid>
    </Container>
  );
}
