import { Button, HStack, Link } from "@chakra-ui/react";
import NavButtons from "./buttons/nav-buttons";
import SignOutButton from "./buttons/sign-out-button";
import MobileLayout from "./mobile-layout";

export default function NavItems({ session }) {
  return (
    <>
      {!session ? (
        <Link
          href="https://github.com/mploythai/hot-discord-cards"
          _hover={{ textDecor: "none" }}
          isExternal
        >
          <Button variant="ghost" size="sm" rounded="lg">
            Source Code
          </Button>
        </Link>
      ) : (
        <>
          <HStack display={["none", "initial"]}>
            <NavButtons size="sm" />
            <SignOutButton size="sm" />
          </HStack>

          <MobileLayout />
        </>
      )}
    </>
  );
}
