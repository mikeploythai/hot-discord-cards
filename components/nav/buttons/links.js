import { Button } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";

export default function NavLinks({ size, onClose }) {
  const supabase = useSupabaseClient();

  const links = [
    { name: "Dashboard", href: "/", key: 1 },
    { name: "Points", href: "/points", key: 2 },
    { name: "Buy", href: "/buy", key: 3 },
    { name: "Trade", href: "/trade", key: 4 },
  ];

  return (
    <>
      {links.map((link) => {
        return (
          <Link key={link.key} href={link.href} passHref>
            <Button size={size} variant="ghost" rounded="lg" onClick={onClose}>
              {link.name}
            </Button>
          </Link>
        );
      })}

      <Button
        leftIcon={<FaSignOutAlt />}
        size={size}
        variant="outline"
        colorScheme="red"
        rounded="lg"
        onClick={() => supabase.auth.signOut()}
      >
        Sign Out
      </Button>
    </>
  );
}
