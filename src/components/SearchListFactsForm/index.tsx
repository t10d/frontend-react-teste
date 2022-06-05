import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { IFact } from "../SearchFact";
import { IParamsFacts } from "../SearchListFacts";

export function SearchListFactsForm({
  setFacts,
  setLoading,
  setParamsFacts,
  setHasEndingPosts,
  setCurrentPage,
}: {
  setFacts: React.Dispatch<React.SetStateAction<IFact[] | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setParamsFacts: React.Dispatch<React.SetStateAction<IParamsFacts | null>>;
  setHasEndingPosts: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const toast = useToast();
  const [error, setError] = useState<boolean>(false);
  const [length, setLength] = useState<number | null>(null);
  const [limit, setLimit] = useState<number | null>(null);

  const onChangeLength = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setError(false);
    setLength(parseInt(event.target.value, 10));
  };

  const onChangeLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setError(false);
    setLimit(parseInt(event.target.value, 10));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (length && length < 20) {
      setError(true);
      return;
    }
    setLoading(true);
    axios
      .get("https://catfact.ninja/facts", {
        params: {
          max_length: length,
          limit,
          page: 1,
        },
      })
      .then((res) => {
        setParamsFacts({
          max_length: length || null,
          limit: limit || null,
        });
        setHasEndingPosts(false);
        setCurrentPage(1);
        setFacts(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        toast({
          status: "error",
          title: err.message,
          position: "top-right",
        });
        setLoading(false);
      });
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <FormControl id="length" isRequired>
        <Input
          type="number"
          name="length"
          placeholder="Tamanho do fato"
          onChange={(event) => onChangeLength(event)}
          value={length || ""}
        />
      </FormControl>
      <FormControl id="limit" marginTop="1vh" isRequired>
        <Input
          type="number"
          name="limit"
          placeholder="Quantidade de fatos"
          onChange={(event) => onChangeLimit(event)}
          value={limit || ""}
        />
        {error && (
          <Text color="red">O tamanho precisa ser maior ou igual a 20</Text>
        )}
      </FormControl>
      <Flex justifyContent={["center", "center", "end"]}>
        <Button marginTop="1vh" colorScheme="teal" type="submit">
          Buscar
        </Button>
      </Flex>
    </form>
  );
}

export default SearchListFactsForm;
