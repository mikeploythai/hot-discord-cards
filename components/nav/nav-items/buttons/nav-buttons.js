import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function NavButtons({ size, onClose }) {
  const links = [
    { name: "Dashboard", href: "/", id: 1 },
    { name: "Clicker", href: "/clicker", id: 2 },
    { name: "Buy", href: "/buy", id: 3 },
    { name: "Trade", href: "/trade", disabled: true, id: 4 },
  ];

  return (
    <>
      {links.map((link) => {
        return (
          <Link key={link.id} href={link.href} passHref scroll>
            <Button
              variant="ghost"
              size={size}
              rounded="lg"
              isDisabled={link.disabled}
              onClick={onClose}
            >
              {link.name}
            </Button>
          </Link>
        );
      })}
    </>
  );
}
