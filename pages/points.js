import { useMediaQuery } from "@chakra-ui/react";
import Page from "../components/general/page";
import Points from "../components/points";

export default function PointsPage() {
  const [notLandscape] = useMediaQuery("(min-height: 480px)");

  return (
    <Page
      title="Points"
      maxH={{ base: null, sm: notLandscape ? "100vh" : null }}
    >
      <Points />
    </Page>
  );
}
