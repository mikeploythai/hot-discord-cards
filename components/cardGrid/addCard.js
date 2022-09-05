import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function AddCard() {
  const [loaded, setLoaded] = useState(false);

  async function addRandomCard() {
    try {
      setLoaded(false);
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
    } finally {
      setLoaded(true);
    }
  }

  return (
    <Button onClick={() => addRandomCard()} isLoading={loaded}>
      Add Card
    </Button>
  );
}
