/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Center,
  CircularProgress,
  Flex,
  FormControl,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Formik, FormikValues } from "formik";
import axios from "axios";
import { IFact } from "../SearchFact";
import CardFacts from "../CardFacts";

interface IParamsFacts {
  max_length?: number;
  limit?: number;
}

export function SearchFact() {
  const [facts, setFacts] = useState<Array<IFact> | null>(null);
  const [paramsFacts, setParamsFacts] = useState<IParamsFacts | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const toast = useToast();
  const loaderRef = useRef(null);
  const [hasEndingPosts, setHasEndingPosts] = useState<boolean>(false);

  useEffect(() => {
    if (facts) {
      const options = {
        root: null,
        rootMargin: "20px",
        threshold: 1.0,
      };
      const intersectionObserver = new IntersectionObserver((entities) => {
        const target = entities[0];

        if (target.isIntersecting) {
          setCurrentPage((old) => old && old + 1);
        }
      }, options);

      if (loaderRef.current) {
        intersectionObserver.observe(loaderRef.current);
      }

      return () => intersectionObserver.disconnect();
    }
  }, [facts]);

  useEffect(() => {
    if (currentPage !== null && currentPage > 1) {
      const handleResquest = async () => {
        const { data } = await axios.get("https://catfact.ninja/facts", {
          params: {
            max_length: paramsFacts?.max_length,
            limit: paramsFacts?.limit,
            page: currentPage,
          },
        });

        if (data?.next_page_url === null) {
          setHasEndingPosts(true);
          return;
        }
        setFacts([...(facts || []), ...data.data]);
      };
      if (!hasEndingPosts) {
        handleResquest();
      }
      return;
    }
  }, [currentPage]);

  const onSubmit = (values: FormikValues) => {
    setLoading(true);
    axios
      .get("https://catfact.ninja/facts", {
        params: {
          max_length: values.length,
          limit: values.limit,
          page: 1,
        },
      })
      .then((res) => {
        setParamsFacts({
          max_length: values.length,
          limit: values.limit,
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
    <div>
      <Formik initialValues={{ length: "", limit: "" }} onSubmit={onSubmit}>
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FormControl id="length" isRequired>
              <Input
                type="number"
                name="length"
                placeholder="Tamanho do fato"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.length}
              />
            </FormControl>
            <FormControl id="limit" marginTop="1vh" isRequired>
              <Input
                type="number"
                name="limit"
                placeholder="Quantidade de fatos"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.limit}
              />
            </FormControl>
            <Flex justifyContent="end">
              <Button
                marginTop="1vh"
                size="sm"
                colorScheme="teal"
                type="submit"
              >
                Buscar
              </Button>
            </Flex>
          </form>
        )}
      </Formik>
      {loading ? (
        <Center>
          <CircularProgress isIndeterminate color="orange.400" />
        </Center>
      ) : (
        <Box>
          {facts && (
            <Box height="100px">
              {facts?.map((f, index) => (
                <CardFacts key={`${f.fact}-${index}`} factProp={f} />
              ))}
              <div ref={loaderRef} />
            </Box>
          )}
        </Box>
      )}
    </div>
  );
}

export default SearchFact;
