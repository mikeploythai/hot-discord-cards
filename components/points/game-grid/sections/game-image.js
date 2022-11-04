import { Image } from "@chakra-ui/react";
import getUserData from "../../../../utils/get-user-data";
import { updateUserData } from "../../../../utils/update-user-data";
import Template from "./template";

export default function GameImage() {
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
    <Template h="100%" justify="center">
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
    </Template>
  );
}
