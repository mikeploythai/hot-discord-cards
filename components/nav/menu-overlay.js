import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  VStack,
} from "@chakra-ui/react";

export default function MenuOverlay({
  isOpen,
  onClose,
  btnRef,
  SignOutButton,
  NavButtons,
}) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      finalFocusRef={btnRef}
      placement="right"
      size="full"
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton size="lg" />
          
          <DrawerBody>
            <VStack h="100%" justify="center" gap="32px">
              <NavButtons size="lg" />
              <SignOutButton size="lg" />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
