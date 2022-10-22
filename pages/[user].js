import { createClient } from "@supabase/supabase-js";
import Page from "../components/general/page";
import Profile from "../components/profile";
import ProfileCard from "../components/profile/card";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(url, key);

export default function User({ user }) {
  return (
    <Page title={user.username}>
      <Profile>
        <ProfileCard userData={user} display="none" />
      </Profile>
    </Page>
  );
}

export async function getStaticProps({ params }) {
  let { data } = await supabase
    .from("profiles")
    .select()
    .eq("username", params["user"])
    .single();

  return {
    props: {
      user: data,
    },
  };
}

export async function getStaticPaths() {
  let { data } = await supabase.from("profiles").select("username");

  return {
    paths: data.map((data) => {
      return {
        params: {
          user: data.username,
        },
      };
    }),
    fallback: false,
  };
}
