import React, { useState } from "react";
import { Box, Center, CircularProgress } from "@chakra-ui/react";
import CardFacts from "../CardFacts/CardFacts";
import SearchFactForm from "../SearchFactForm/SearchFactForm";

export interface IFact {
  fact: string;
  length?: number;
}

export function SearchFact() {
  const [facts, setFacts] = useState<Array<IFact> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div>
      <SearchFactForm
        facts={facts}
        setFacts={setFacts}
        setLoading={setLoading}
      />
      {loading ? (
        <Center>
          <CircularProgress isIndeterminate color="orange.400" />
        </Center>
      ) : (
        <Box height="100px" marginTop="15px">
          {facts?.map((f) => (
            <CardFacts key={f.fact} factProp={f} />
          ))}
        </Box>
      )}
    </div>
  );
}

export default SearchFact;
