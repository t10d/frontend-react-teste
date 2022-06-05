import React from "react";
import { Flex, Heading, Image } from "@chakra-ui/react";

export function Header() {
  return (
    <Flex marginY="20px">
      <Flex cursor="pointer" align="center">
        <Image width="30px" height="30px" src="icon.png" />
        <Flex>
          <Heading size="lg" marginLeft="10px">
            Cats
          </Heading>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header;
