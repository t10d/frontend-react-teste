import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { IFact } from "../SearchFact";

export function SearchFactForm({
  facts,
  setFacts,
  setLoading,
}: {
  facts: IFact[] | null;
  setFacts: React.Dispatch<React.SetStateAction<IFact[] | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [length, setLength] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasEndingPosts, setHasEndingPosts] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const toast = useToast();

  const onChangeLength = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setCurrentPage(1);
    setError(false);
    setHasEndingPosts(false);

    setLength(parseInt(event.target.value, 10));
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
          limit: 1,
          page: currentPage,
        },
      })
      .then((res) => {
        if (currentPage === 1) {
          setFacts(res.data.data);
          setCurrentPage(currentPage + 1);
          if (res.data.next_page_url === null) {
            setHasEndingPosts(true);
            setLoading(false);
            return;
          }
          setLoading(false);
          return;
        }
        setFacts([...(facts || []), ...res.data.data]);
        setCurrentPage(currentPage + 1);
        if (res.data.next_page_url === null) {
          setHasEndingPosts(true);
          setLoading(false);
          return;
        }
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

  const onReset = () => {
    setCurrentPage(1);
    setLength(0);
    setFacts(null);
    setHasEndingPosts(false);
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
        {error && (
          <Text color="red">O tamanho precisa ser maior ou igual a 20</Text>
        )}
      </FormControl>

      <Flex justifyContent={["center", "center", "end"]}>
        <ButtonGroup marginTop="1vh" gap="1">
          <Button type="button" onClick={onReset}>
            Resetar
          </Button>
          <Button colorScheme="teal" type="submit" disabled={hasEndingPosts}>
            Buscar
          </Button>
        </ButtonGroup>
      </Flex>
    </form>
  );
}

export default SearchFactForm;
