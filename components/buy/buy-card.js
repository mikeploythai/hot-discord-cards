import {
  Button,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import BuyRevealOverlay from "./buy-reveal-overlay";

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
  const toastPos = useBreakpointValue({ base: "bottom", md: "bottom-right" });
  const toastW = useBreakpointValue({ base: "100%", md: "320px" });
  const toastP = useBreakpointValue({ base: "0 16px 8px", md: "0 8px 8px" });

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
      const randNum = Math.floor(Math.random() * card.length);
      const randCard = card[randNum].id;

      if (card) {
        setName(card[randNum].name);
        setImg(card[randNum].image);
        setAttr(card[randNum].attribute);
      }

      const user = await getCurrentUser();
      let { data: db, error } = await supabase
        .from("owners")
        .select("card_id, cards!inner (name)")
        .eq("user_id", user.id);

      async function insert() {
        await supabase
          .from("owners")
          .upsert(
            { user_id: user.id, card_id: randCard },
            { ignoreDuplicates: true }
          );
      }

      if (db.length === 0) insert();
      else {
        for (let i in db) if (db[i].card_id === randCard) setOwn(true);
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
        boxShadow="xs"
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

      <BuyRevealOverlay
        isOpen={isOpen}
        onClose={onClose}
        name={name}
        img={img}
        attr={attr}
        own={own}
        reset={reset}
      />
    </>
  );
}
