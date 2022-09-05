import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function AddCard() {
  const [loaded, setLoaded] = useState(false);
  const [card, setCard] = useState([]);

  useEffect(() => {
    getCardData();

    const realtimeUpdate = supabase
      .from("owners")
      .on("*", () => {
        getCardData();
      })
      .subscribe();
    return () => supabase.removeSubscription(realtimeUpdate);
  }, []);

  async function getCardData() {
    try {
      let user = supabase.auth.user();

      let { data: card, error } = await supabase
        .from("cards")
        .select(`name, id, image, attribute, owners!inner (*)`)
        .eq("owners.user_id", user.id);
      if (error) throw error;

      if (card) setCard(card);
    } catch (error) {
      alert(error.message);
    }
  }

  async function addRandomCard() {
    try {
      let { data: card } = await supabase.from("cards").select("id");
      const rand = Math.floor(Math.random() * card.length);
      const result = card[rand].id;

      const user = supabase.auth.user();
      let { data: db, error } = await supabase
        .from("owners")
        .select("card_id, cards!inner (name)")
        .eq("user_id", user.id);

      let insert = async () => {
        await supabase
          .from("owners")
          .insert([{ user_id: user.id, card_id: result }], {
            upsert: true,
          });
      };

      if (db.length === 0) {
        insert();
      } else {
        for (let i = 0; i < db.length; i++) {
          if (db[i].card_id === result) {
            setLoaded(true);
            alert(`You already own ${db[i].cards.name}!`);
          } else {
            insert();
          }
        }
      }

      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Button onClick={() => addRandomCard()} isLoading={loaded}>
      Add Card
    </Button>
  );
}
