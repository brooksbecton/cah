import React from "react";
import { addDecorator } from "@storybook/react";
import { ThemeDecorator } from "../../../../.storybook/themeWrapper";
import { defaultState } from "../../../game/game/defaultState";
import { InfoBar as InfoBarComponent } from "./InfoBar";

addDecorator(ThemeDecorator);

export default {
  title: "InfoBar",
  component: InfoBarComponent,
};

export const InfoBar = () => {
  return (
    <div style={{ height: "100vh" }}>
      <InfoBarComponent
        G={defaultState}
        phase={"play"}
        gameMetadata={{
          0: { name: "Hope", id: 0 },
          1: { name: "Brooks", id: 1 },
        }}
        winnerCards={[{ playerID: "0", text: "Black tar heroine" }]}
      />
    </div>
  );
};

export const SecondPlayerWinner = () => {
  return (
    <div style={{ height: "100vh" }}>
      <InfoBarComponent
        G={{ ...defaultState, currentCzarID: 1 }}
        phase={"play"}
        gameMetadata={{
          0: { name: "Hope", id: 0 },
          1: { name: "Brooks", id: 1 },
        }}
        winnerCards={[{ playerID: "0", text: "Black tar heroine" }]}
      />
    </div>
  );
};
