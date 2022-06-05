import React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import SearchFact from "../SearchFact/SearchFact";
import SearchListFacts from "../SearchListFacts/SearchListFacts";

export function TabChooseSearchFacts() {
  return (
    <Tabs width="80%" variant="soft-rounded" colorScheme="yellow">
      <TabList>
        <Tab>Fatos</Tab>
        <Tab>Lista de fatos</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SearchFact />
        </TabPanel>
        <TabPanel>
          <SearchListFacts />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default TabChooseSearchFacts;
