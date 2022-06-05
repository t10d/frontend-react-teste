import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TabChooseSearchFacts } from "./TabChooseSearchFacts";

export default {
  title: "TabChooseSearchFacts",
  components: TabChooseSearchFacts,
} as ComponentMeta<typeof TabChooseSearchFacts>;

const Template: ComponentStory<typeof TabChooseSearchFacts> = (args) => (
  <TabChooseSearchFacts />
);

export const Primary = Template.bind({});
