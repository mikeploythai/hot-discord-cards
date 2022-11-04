import {
  Avatar,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Image,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaBomb, FaHandPeace, FaMagic, FaQuestionCircle } from "react-icons/fa";
import getAllUsers from "../../utils/get-all-users";
import getUserData from "../../utils/get-user-data";
import { updateUserData } from "../../utils/update-user-data";
import EmptySpace from "../general/empty-space";

export default function Points() {
  function GameGrid() {
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

  function Leaderboard({ userData }) {
    const allUsers = getAllUsers();
    const [notLandscape] = useMediaQuery("(min-height: 480px)");
    const [foldLandscape] = useMediaQuery("(max-height: 280px)");

    return (
      <GameTemplate
        h="100%"
        maxH={{
          base: "50vh",
          sm: notLandscape ? "unset" : foldLandscape ? "100vh" : "80vh",
        }}
      >
        <UserInfo data={userData} link="/" />
        <Divider />
        <Heading size="sm">Click Leaderboard</Heading>

        <VStack w="100%" gap={4} overflow="scroll">
          {allUsers.map((users) => {
            return (
              <UserInfo
                key={users.id}
                data={users}
                link={
                  users.username === userData.username
                    ? "/"
                    : `/${users.username}`
                }
              />
            );
          })}
        </VStack>
      </GameTemplate>
    );
  }

  function GameTemplate({ h, maxH, justify, children }) {
    return (
      <VStack
        pos="relative"
        h={h}
        maxH={maxH}
        p={{ base: 6, md: 8 }}
        gap={4}
        justify={justify}
        bgColor="white"
        boxShadow="xs"
        rounded="lg"
      >
        {children}
      </VStack>
    );
  }

  function GameImage() {
    const { userData, getData } = getUserData();
    const { updateData } = updateUserData();

    function addPoints() {
      let changes = {
        points: userData.points + 1,
        clicks: userData.clicks + 1,
      };

      updateData(changes, true);
      getData();
    }

    return (
      <GameTemplate h="100%" justify="center">
        <Image
          src="https://cdn.discordapp.com/attachments/945912566000001045/1019300849685631046/image0.jpg"
          alt="moike"
          maxW="300px"
          w="100%"
          boxShadow="lg"
          rounded="md"
          cursor="pointer"
          transition=".1s ease-in-out"
          onClick={() => {
            addPoints();
            getData();
          }}
          _active={{ transform: "scale(1.15)", boxShadow: "2xl" }}
        />
      </GameTemplate>
    );
  }

  function Powerups({ userData }) {
    return (
      <GameTemplate>
        <Flex
          direction={{ base: "column", sm: "row" }}
          w="100%"
          align="center"
          justify="space-between"
          gap={4}
        >
          <Flex
            direction={{ base: "row", sm: "column" }}
            w="100%"
            align={{ base: "center", sm: "start" }}
            justify="space-between"
          >
            <Heading size="md">Powerups</Heading>

            <Skeleton rounded="md" noOfLines={1} isLoaded={userData}>
              <Text fontSize={{ base: "sm", sm: "xs" }}>
                <b>{userData.points}</b> Points
              </Text>
            </Skeleton>
          </Flex>

          <HStack
            w={{ base: "100%", sm: "unset" }}
            justify="space-between"
            gap={{ base: 0, sm: 4 }}
          >
            <IconButton icon={<FaHandPeace />} disabled />
            <IconButton icon={<FaMagic />} disabled />
            <IconButton icon={<FaBomb />} disabled />
            <IconButton icon={<FaQuestionCircle />} disabled />
          </HStack>
        </Flex>
      </GameTemplate>
    );
  }

  function UserInfo({ data, link }) {
    const [breakpoint] = useMediaQuery("(max-width: 360px)");

    return (
      <HStack w="100%" justify="space-between">
        <SkeletonCircle h="100%" w="auto" isLoaded={data}>
          <Link href={link} passHref>
            <Avatar
              src={data.picture}
              name={data.username}
              size={breakpoint ? "sm" : "md"}
              boxShadow="xs"
              cursor="pointer"
            />
          </Link>
        </SkeletonCircle>

        <VStack textAlign="end" align="end">
          <Skeleton rounded="md" isLoaded={data}>
            <Link href={link} passHref>
              <Heading size="sm" noOfLines={1} cursor="pointer">
                {data.username}
              </Heading>
            </Link>
          </Skeleton>

          <Skeleton rounded="md" noOfLines={1} isLoaded={data}>
            <Text fontSize="xs">
              <b>{data.clicks}</b> Clicks
            </Text>
          </Skeleton>
        </VStack>
      </HStack>
    );
  }

  return (
    <SimpleGrid templateRows={"min-content 1fr"} w="100%" gap={4}>
      <EmptySpace />
      <GameGrid />
    </SimpleGrid>
  );
}
