import React, { useState } from "react";
import { Box, Center, CircularProgress } from "@chakra-ui/react";
import CardFacts from "../CardFacts";
import SearchFactForm from "../SearchFactForm";

export interface IFact {
  fact?: "string";
  length?: number;
}

export function SearchFact() {
  const [facts, setFacts] = useState<Array<IFact> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const validateLength = (value: any) => {
    let error;
    if (!value) {
      error = "É preciso informar um tamanho!";
    }
    return error;
  };

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
