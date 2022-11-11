import { Image } from "@chakra-ui/react";
import { updateUserData } from "../../../../utils/update-user-data";
import Template from "./template";

export default function GameImage({ userData, getData }) {
  const { updateData } = updateUserData();

  function addPoints() {
    let changes = {
      points: userData.points + 1,
      clicks: userData.clicks + 1,
    };

    updateData(changes, true);
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
