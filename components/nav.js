import { Button, Container, Flex, Heading, HStack } from "@chakra-ui/react";
import { supabase } from "../utils/supabaseClient";
import Link from "next/link";

export default function Nav() {
  const navItems = [
    { title: "Dashboard", page: "/", id: 1 },
    { title: "Clicker", page: "/#", id: 2, disabled: true },
    { title: "Buy", page: "/#", id: 3, disabled: true },
    { title: "Trade", page: "/#", id: 4, disabled: true },
  ];

  function NavItems() {
    return (
      <HStack display={{ base: "none", md: "initial" }}>
        {navItems.map((items) => {
          return (
            <Link key={items.id} href={items.page}>
              <Button size="sm" variant="ghost" isDisabled={items.disabled}>
                {items.title}
              </Button>
            </Link>
          );
        })}

        <Button
          size="sm"
          colorScheme="purple"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </Button>
      </HStack>
    );
  }

  return (
    <Flex
      pos="fixed"
      w="100%"
      top="0"
      bgColor="white"
      boxShadow="xs"
      zIndex="10"
    >
      <Container maxW="container.md" p="16px">
        <HStack justify="space-between">
          <Heading size="md">Hot Discord Cards</Heading>

          <NavItems />
        </HStack>
      </Container>
    </Flex>
  );
}
