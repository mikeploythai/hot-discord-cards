import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";

export default function addRandomCard(user) {
  const supabase = useSupabaseClient();
  const [cardData, setCardData] = useState([]);
  const [own, setOwn] = useState(false);

  async function addCard() {
    try {
      let { data: card, error: cardError } = await supabase
        .from("cards")
        .select("*");
      if (cardError) throw error;
      let randomNum = Math.floor(Math.random() * card.length);
      if (card) setCardData(card[randomNum]);

      let { data: db, error } = await supabase
        .from("owners")
        .select("card_id, cards!inner (name)")
        .eq("user_id", user.id);
      if (error) throw error;

      async function insert() {
        await supabase.from("owners").upsert(
          {
            user_id: user.id,
            card_id: cardData.id,
          },
          { ignoreDuplicates: true }
        );
      }

      if (db.length === 0) insert();
      else {
        for (let i in db) if (db[i].card_id === cardData.id) setOwn(true);
        insert();
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function reset() {
    setCardData([]);
    setOwn(false);
  }

  return { addCard, reset, cardData, own };
}
