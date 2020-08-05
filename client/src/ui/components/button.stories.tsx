import React from "react";
import { addDecorator } from "@storybook/react";
import styled from "styled-components";
import { ThemeDecorator } from "../../../.storybook/themeWrapper";
import { Button } from "./components";

addDecorator(ThemeDecorator);

export default {
  title: "Button",
  component: Button,
};

export const Normal = () => {
  return <Button>Create Game</Button>;
};

export const Loading = () => {
  return <Button isLoading>Create Game</Button>;
};
