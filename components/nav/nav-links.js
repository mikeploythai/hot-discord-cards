import {
  Button,
  HStack,
  IconButton,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { supabase } from "../../utils/supabaseClient";
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import { useRef } from "react";
import MenuOverlay from "./menu-overlay";

export default function NavLinks({ session }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const links = [
    { name: "Dashboard", href: "/", id: 1 },
    { name: "Clicker", href: "/clicker", disabled: true, id: 2 },
    { name: "Buy", href: "/buy", disabled: true, id: 3 },
    { name: "Trade", href: "/trade", disabled: true, id: 4 },
  ];

  function NavButtons({ size }) {
    return (
      <>
        {links.map((link) => {
          return (
            <Button
              key={link.id}
              variant="ghost"
              size={size}
              href={link.href}
              isDisabled={link.disabled}
              onClick={onClose}
            >
              {link.name}
            </Button>
          );
        })}
      </>
    );
  }

  function SignOutButton({ size }) {
    return (
      <Button
        leftIcon={<FaSignOutAlt />}
        variant="outline"
        colorScheme="red"
        size={size}
        onClick={() => supabase.auth.signOut()}
      >
        Sign Out
      </Button>
    );
  }

  return (
    <>
      {!session ? (
        <Link
          href="https://github.com/mploythai/hot-discord-cards"
          _hover={{ textDecor: "none" }}
          isExternal
        >
          <Button variant="ghost" size="sm">
            Source Code
          </Button>
        </Link>
      ) : (
        <>
          <HStack display={{ base: "none", md: "initial" }}>
            <NavButtons size="sm" />
            <SignOutButton size="sm" />
          </HStack>

          <IconButton
            display={{ base: "flex", md: "none" }}
            aria-label="menu"
            icon={<FaBars />}
            justifyItems="center"
            ref={btnRef}
            onClick={onOpen}
          />

          <MenuOverlay
            isOpen={isOpen}
            onClose={onClose}
            btnRef={btnRef}
            SignOutButton={SignOutButton}
            NavButtons={NavButtons}
          />
        </>
      )}
    </>
  );
}
