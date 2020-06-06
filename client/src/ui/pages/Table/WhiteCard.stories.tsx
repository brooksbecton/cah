import React from "react";
import { addDecorator } from "@storybook/react";

import { ThemeDecorator } from "../../../../.storybook/themeWrapper";
import { WhiteCard } from "./WhiteCard";

addDecorator(ThemeDecorator);

export default {
  title: "Button",
  component: WhiteCard,
};

export const Winner = () => {
  return (
    <WhiteCard
      draggable={false}
      author={"Brooks"}
      winner
      text={"Eating all of the cookies before the AIDS bake-sale."}
    />
  );
};

export const InHand = () => {
  return (
    <WhiteCard
      text={"Eating all of the cookies before the AIDS bake-sale."}
    />
  );
};
