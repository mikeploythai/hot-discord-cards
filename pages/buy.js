import { Container, GridItem, useMediaQuery, VStack } from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";
import Buy from "../components/buy";
import Landing from "../components/general/landing";
import Page from "../components/general/page";
import getUserData from "../utils/get-user-data";

export default function BuyPage() {
  const session = useSession();
  const { userData, getData } = getUserData();
  const [notLandscape] = useMediaQuery("(min-height: 480px)");

  function BuyGrid() {
    return (
      <Container maxW="container.md" p={0}>
        <VStack
          p={{ base: 6, md: 12 }}
          gap={{ base: 2, sm: 4, md: 8 }}
          bgColor="white"
          boxShadow="xs"
          rounded="lg"
        ></VStack>
      </Container>
    );
  }

  return (
    <Page
      title="Points"
      maxH={{ base: null, sm: notLandscape ? "100vh" : null }}
    >
      {session ? (
        <Buy>
          <BuyGrid />
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
