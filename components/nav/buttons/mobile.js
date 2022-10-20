import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  VStack,
} from "@chakra-ui/react";
import NavLinks from "./links";

export default function MobileMenu({ isOpen, onClose, btnRef }) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      finalFocusRef={btnRef}
      placement="right"
      size="full"
    >
      <DrawerOverlay display={{ base: "flex", md: "none" }}>
        <DrawerContent>
          <DrawerCloseButton size="lg" rounded="lg" top={4} right={4} />
          <DrawerBody>
            <VStack h="100%" justify="center" gap={4}>
              <NavLinks size="lg" onClose={onClose} />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
