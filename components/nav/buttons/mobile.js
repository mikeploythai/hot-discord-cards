import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import NavLinks from "./links";

export default function MobileMenu({ isOpen, onClose, btnRef }) {
  const [notLandscape] = useMediaQuery("(min-height: 480px)");

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
            <VStack h="100%" justify="center" gap={notLandscape ? 8 : 4}>
              <NavLinks size={notLandscape ? "lg" : "md"} onClose={onClose} />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
