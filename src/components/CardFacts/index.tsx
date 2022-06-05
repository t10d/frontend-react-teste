import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { IFact } from "../SearchFact";

export function Index({ factProp }: { factProp: IFact }) {
  const { fact } = factProp;
  return (
    <Box>
      <Flex
        bg="primary"
        w="full"
        alignItems="center"
        justifyContent="center"
        rounded={["xl", "xl", "none"]}
        marginTop={["15px", "15px", "0px"]}
      >
        <Box w="full" maxW="sm" mx="auto" px={4} py={3}>
          <Box>
            <Text color="tertiary" fontSize="lg ">
              {fact}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default Index;
