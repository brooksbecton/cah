import React, { useState } from "react";
import { addDecorator } from "@storybook/react";

import { ThemeDecorator } from "../../../.storybook/themeWrapper";
import { Input } from "./components";

addDecorator(ThemeDecorator);

export default {
  title: "Input",
  component: Input,
};

export const Text = () => {
  const [value, setValue] = useState("");
  return (
    <Input
      placeholder="Enter Value"
      data-test-id="gameId"
      type="text"
      onChange={(e) => {
        setValue(e.target.value);
      }}
      value={value}
    />
  );
};

export const Number = () => {
  const [value, setValue] = useState("");
  return (
    <Input
      placeholder="Enter Value"
      data-test-id="gameId"
      type="number  "
      onChange={(e) => {
        setValue(e.target.value);
      }}
      value={value}
    />
  );
};
