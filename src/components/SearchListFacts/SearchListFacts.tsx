/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { Box, Center, CircularProgress } from "@chakra-ui/react";
import axios from "axios";
import { IFact } from "../SearchFact/SearchFact";
import CardFacts from "../CardFacts/CardFacts";
import SearchListFactsForm from "../SearchListFactsForm/SearchListFactsForm";

export interface IParamsFacts {
  max_length?: number | null;
  limit?: number | null;
}

export function SearchFact() {
  const [facts, setFacts] = useState<Array<IFact> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const [paramsFacts, setParamsFacts] = useState<IParamsFacts | null>(null);
  const [hasEndingPosts, setHasEndingPosts] = useState<boolean>(false);

  const loaderRef = useRef(null);

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
    }
  }, [currentPage]);

  return (
    <div>
      <SearchListFactsForm
        setFacts={setFacts}
        setLoading={setLoading}
        setParamsFacts={setParamsFacts}
        setHasEndingPosts={setHasEndingPosts}
        setCurrentPage={setCurrentPage}
      />
      {loading ? (
        <Center>
          <CircularProgress isIndeterminate color="orange.400" />
        </Center>
      ) : (
        <Box>
          {facts && (
            <Box height="100px" marginTop="5px">
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
