import {
  Heading,
  Text,
  VStack,
  Grid,
  GridItem,
  useMediaQuery,
} from "@chakra-ui/react";
import EmptySpace from "./empty-space";
import SignInButton from "./sign-in-button";

export default function Landing() {
  const [notLandscape] = useMediaQuery("(min-height: 480px)");

  return (
    <Grid
      w="100%"
      templateAreas={`
        'header'
        'main'
        'main'
      `}
      gap={4}
    >
      <GridItem area={"header"}>
        <EmptySpace />
      </GridItem>

      <GridItem area={"main"}>
        <VStack gap={{ base: 8, md: 12 }}>
          <VStack
            textAlign="center"
            maxW={notLandscape ? "2xl" : "md"}
            gap={{ base: 0.5, md: 2 }}
          >
            <Heading size={{ base: "xl", md: notLandscape ? "3xl" : "xl" }}>
              One of the trading card games of all time.
            </Heading>

            <Text
              fontSize={{ base: "md", md: notLandscape ? "xl" : "md" }}
              fontWeight="medium"
            >
              Also a social media platform, I guess.
            </Text>
          </VStack>

          <SignInButton small="md" large="lg" />
        </VStack>
      </GridItem>
    </Grid>
  );
}
