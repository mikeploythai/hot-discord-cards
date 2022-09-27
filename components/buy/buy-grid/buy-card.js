import {
  Button,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../../../utils/supabase-client";
import CardInfoOverlay from "../../card-info-overlay";

export default function BuyCard({
  level,
  color,
  active,
  cost,
  points,
  getPointData,
  getCurrentUser,
}) {
  const [name, setName] = useState(null);
  const [img, setImg] = useState(null);
  const [attr, setAttr] = useState(null);
  const [own, setOwn] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const toastPos = useBreakpointValue(["bottom", "bottom-right"]);
  const toastW = useBreakpointValue(["100%", "320px"]);
  const toastP = useBreakpointValue(["0 16px 8px", "0 8px 8px"]);

  async function updatePointData(cost) {
    try {
      const user = await getCurrentUser();

      const updates = {
        id: user.id,
        points: points - cost,
        updated_at: new Date(),
      };

      let { error } = await supabase
        .from("profiles")
        .upsert(updates, { returning: "minimal" });

      if (error) throw error;
    } catch (error) {
      toast({
        title: "Error!",
        description: error.message,
        status: "error",
        position: toastPos,
        containerStyle: {
          w: toastW,
          p: toastP,
        },
        isClosable: true,
      });
    } finally {
      getPointData();
    }
  }

  async function addRandomCard(level) {
    try {
      let { data: card } = await supabase
        .from("cards")
        .select("id, name, image, attribute")
        .eq("level", level);

      let randomNum = Math.floor(Math.random() * card.length);

      if (card) {
        setName(card[randomNum].name);
        setImg(card[randomNum].image);
        setAttr(card[randomNum].attribute);
      }

      let { data: db, error } = await supabase
        .from("owners")
        .select("card_id, cards!inner (name)")
        .eq("user_id", user.id);

      const user = await getCurrentUser();
      async function insert() {
        await supabase.from("owners").upsert(
          {
            user_id: user.id,
            card_id: card[randomNum].id,
          },
          { ignoreDuplicates: true }
        );
      }

      if (db.length === 0) insert();
      else {
        for (let i in db)
          if (db[i].card_id === card[randomNum].id) setOwn(true);
        insert();
      }

      if (error) throw error;
    } catch (error) {
      toast({
        title: "Error!",
        description: error.message,
        status: "error",
        position: toastPos,
        containerStyle: {
          w: toastW,
          p: toastP,
        },
        isClosable: true,
      });
    }
  }

  function reset() {
    setOwn(false);
    setName(null);
    setImg(null);
    setAttr(null);
  }

  return (
    <>
      <Button
        bgColor={color}
        color="white"
        w="200px"
        h="300px"
        p="16px"
        rounded="lg"
        textTransform="capitalize"
        transition=".25s ease-in-out"
        _hover={{ transform: points >= cost ? "scale(1.05)" : "unset" }}
        _active={{ bgColor: active }}
        onClick={onOpen}
        onClickCapture={() => {
          addRandomCard(level);
          updatePointData(cost);
        }}
        isDisabled={points >= cost ? false : true}
      >
        {level} Pack<br></br>
        {cost} Points
      </Button>

      <CardInfoOverlay
        header="You've unlocked..."
        gap="8px"
        isOpen={isOpen}
        onClose={onClose}
        name={name}
        img={img}
        attr={attr}
        own={own}
        reset={reset}
        buy={true}
      />
    </>
  );
}
