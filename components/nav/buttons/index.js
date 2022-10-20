import {
  Button,
  HStack,
  IconButton,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FaBars } from "react-icons/fa";
import NavLinks from "./links";
import MobileMenu from "./mobile";

export default function NavButtons({ session }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      {!session ? (
        <Link href="https://github.com/mploythai/hot-discord-cards" isExternal>
          <Button size="sm" variant="ghost" rounded="lg">
            Source Code
          </Button>
        </Link>
      ) : (
        <>
          <HStack display={{ base: "none", md: "flex" }}>
            <NavLinks size="sm" />
          </HStack>
          <IconButton
            display={{ base: "flex", md: "none" }}
            icon={<FaBars />}
            rounded="lg"
            onClick={onOpen}
          />
          <MobileMenu isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
        </>
      )}
    </>
  );
}
