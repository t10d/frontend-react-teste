import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { IFact } from "../SearchFact";

export function Index({ factProp }: { factProp: IFact }) {
  const { fact } = factProp;
  return (
    <Box>
      <Text>{fact}</Text>
    </Box>
  );
}

export default Index;
