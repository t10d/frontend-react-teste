import React from "react";
import { Box, Flex, Grid, GridItem, Heading, Image } from "@chakra-ui/react";
import { Header } from "./components/Header";
import TabChooseSearchFacts from "./components/TabChooseSearchFacts";

function App() {
  return (
    <Grid templateColumns="10vw 1fr 10vw">
      <GridItem gridColumnStart="2">
        <Header />
        <Flex marginTop="6vh">
          <Box flex="1">
            <Heading marginBottom="6vh"> Fatos curiosos dos gatos</Heading>
            <TabChooseSearchFacts />
          </Box>
          <Image
            flex="1"
            width="30%"
            height="100%"
            src="https://user-images.githubusercontent.com/68256101/172020998-94dfa749-14bd-4c53-b931-a4629954a821.png"
          />
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default App;
