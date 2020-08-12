import React from "react";
import { addDecorator } from "@storybook/react";

import { ThemeDecorator } from "../../../../.storybook/themeWrapper";
import { WhiteCard } from "./WhiteCard";

addDecorator(ThemeDecorator);

export default {
  title: "White Card",
  component: WhiteCard,
};

const Container: React.FC = ({ children }) => {
  return (
    <div
      style={{
        width: "600px",
        backgroundColor: "skyblue",
      }}
    >
      <h1>Container</h1>
      {children}
    </div>
  );
};

export const Winner = () => {
  return (
    <Container>
      <WhiteCard
        draggable={false}
        author={"Brooks"}
        winner
        text={"Eating all of the cookies before the AIDS bake-sale."}
      />
    </Container>
  );
};

export const InHand = () => {
  return (
    <Container>
      <WhiteCard
        text={"Eating all of the cookies before the AIDS bake-sale."}
      />
    </Container>
  );
};
