import { Button } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function NavLinks({ size, onClose }) {
  const supabase = useSupabaseClient();
  const route = useRouter();

  const links = [
    { name: "Dashboard", href: "/", key: 1 },
    { name: "Dabloons", href: "/dabloons", key: 2 },
    { name: "Unlock", href: "/unlock", key: 3 },
    { name: "Trade", href: "/trade", disabled: true, key: 4 },
  ];

  return (
    <>
      {links.map((link) => {
        return (
          <Link key={link.key} href={link.href} passHref>
            <Button
              size={size}
              variant="ghost"
              onClick={onClose}
              disabled={link.disabled}
            >
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
        onClick={() => {
          supabase.auth.signOut();
          route.push("/");
        }}
      >
        Sign Out
      </Button>
    </>
  );
}
