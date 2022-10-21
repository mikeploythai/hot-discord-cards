import Router from "next/router";
import { supabase } from "../supabase-client";

export default async function getCurrentUser() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) throw error;
  if (!session?.user) {
    setTimeout(() => Router.reload(), 1000);
    throw new Error("User not logged in. Reloading...");
  }
  return session.user;
}
