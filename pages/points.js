import { useMediaQuery } from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";
import Landing from "../components/general/landing";
import Page from "../components/general/page";
import Points from "../components/points";

export default function PointsPage() {
  const session = useSession();
  const [notLandscape] = useMediaQuery("(min-height: 480px)");

  return (
    <Page
      title="Points"
      maxH={{ base: null, sm: notLandscape ? "100vh" : null }}
    >
      {session ? (
        <Points />
      ) : (
        <Landing
          title="You must be signed in to view this page."
          subtitle="It's okay, we forgive you."
        />
      )}
    </Page>
  );
}
