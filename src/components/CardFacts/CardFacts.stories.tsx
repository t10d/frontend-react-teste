import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CardFacts } from "./CardFacts";

export default {
  title: "CardFacts",
  components: CardFacts,
} as ComponentMeta<typeof CardFacts>;

const Template: ComponentStory<typeof CardFacts> = (args) => (
  <CardFacts {...args} />
);

export const Complete = Template.bind({});
Complete.args = {
  factProp: {
    fact: "There are approximately 100 breeds of cat.",
  },
};
