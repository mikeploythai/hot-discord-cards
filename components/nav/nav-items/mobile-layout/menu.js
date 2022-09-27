import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  VStack,
} from "@chakra-ui/react";
import NavButtons from "../buttons/nav-buttons";
import SignOutButton from "../buttons/sign-out-button";

export default function Menu({ isOpen, onClose, btnRef }) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      finalFocusRef={btnRef}
      placement="right"
      size="full"
    >
      <DrawerOverlay display={["flex", "none"]}>
        <DrawerContent>
          <DrawerCloseButton size="lg" />
          
          <DrawerBody>
            <VStack h="100%" justify="center" gap="32px">
              <NavButtons size="lg" onClose={onClose} />
              <SignOutButton size="lg" />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
