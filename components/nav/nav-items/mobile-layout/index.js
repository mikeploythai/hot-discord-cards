import { IconButton, useDisclosure } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { useRef } from "react";
import Menu from "./menu";

export default function MobileLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <IconButton
        display={["flex", "none"]}
        aria-label="menu"
        icon={<FaBars />}
        justifyItems="center"
        rounded="lg"
        ref={btnRef}
        onClick={onOpen}
      />

      <Menu isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </>
  );
}
