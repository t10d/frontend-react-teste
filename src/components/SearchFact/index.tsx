import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  CircularProgress,
  Flex,
  FormControl,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik, FormikValues } from "formik";
import axios from "axios";
import CardFacts from "../CardFacts";

export interface IFact {
  fact?: "string";
  length?: number;
}

export function SearchFact() {
  const [facts, setFacts] = useState<Array<IFact> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const validateLength = (value: any) => {
    let error;
    if (!value) {
      error = "É preciso informar um tamanho!";
    }
    return error;
  };

  const onSubmit = (values: FormikValues) => {
    setLoading(true);
    axios
      .get("https://catfact.ninja/fact", {
        params: {
          max_length: values.length,
        },
      })
      .then((res) => {
        setFacts([
          ...(facts || []),
          {
            fact: res.data.fact,
            length: res.data.length,
          },
        ]);
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
    <div>
      <Formik initialValues={{ length: "" }} onSubmit={onSubmit}>
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormControl id="length" isRequired>
              <Input
                type="number"
                name="length"
                placeholder="Tamanho do fato"
                onChange={handleChange}
                value={values.length}
              />
            </FormControl>

            <Flex justifyContent="end">
              <ButtonGroup margin="1" gap="4">
                <Button size="sm" type="button" onClick={() => setFacts(null)}>
                  Resetar
                </Button>
                <Button size="sm" colorScheme="teal" type="submit">
                  Buscar
                </Button>
              </ButtonGroup>
            </Flex>
          </Form>
        )}
      </Formik>
      {loading ? (
        <Center>
          <CircularProgress isIndeterminate color="orange.400" />
        </Center>
      ) : (
        <Box>
          {facts?.map((f) => (
            <CardFacts key={f.fact} factProp={f} />
          ))}
        </Box>
      )}
    </div>
  );
}

export default SearchFact;
