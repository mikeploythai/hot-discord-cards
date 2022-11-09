import { Divider, Heading, useMediaQuery, VStack } from "@chakra-ui/react";
import getAllUsers from "../../../../../utils/get-all-users";
import Template from "../template";
import UserInfo from "./user-info";

export default function Leaderboard({ userData }) {
  const allUsers = getAllUsers();
  const [notLandscape] = useMediaQuery("(min-height: 480px)");
  const [foldLandscape] = useMediaQuery("(max-height: 280px)");

  return (
    <Template
      h="100%"
      maxH={{
        base: "50vh",
        sm: notLandscape ? "unset" : foldLandscape ? "100vh" : "80vh",
      }}
      board={true}
    >
      <UserInfo data={userData} link="/" />
      <Divider />
      <Heading size="sm" p="1rem 0">
        Click Leaderboard
      </Heading>

      <VStack w="100%" h="100%" overflow="scroll">
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
    </Template>
  );
}
