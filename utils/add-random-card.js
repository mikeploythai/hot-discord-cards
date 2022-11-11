import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export default function addRandomCard() {
  const supabase = useSupabaseClient();
  const user = useUser();

  async function addCard(cardData) {
    await supabase.from("owners").upsert(
      {
        user_id: user.id,
        card_id: cardData.id,
      },
      { ignoreDuplicates: true }
    );
  }

  return { addCard };
}
