import React from "react";
import { addDecorator } from "@storybook/react";
import styled from "styled-components";
import { ThemeDecorator } from "../../.storybook/themeWrapper";
import { Colors as ColorsComponent } from "./core";
addDecorator(ThemeDecorator);

export default {
  title: "Core",
  component: <></>,
};

export const Colors = () => {
  return <ColorsComponent />;
};

export const Text = () => {
  const pangram = "When zombies arrive, quickly fax judge Pat.";

  return (
    <div>
      <h1>h1</h1>
      <h1>{pangram}</h1>
      <h2>h2</h2>
      <h2>{pangram}</h2>
      <h3>h3</h3>
      <h3>{pangram}</h3>
      <h4>h4</h4>
      <h4>{pangram}</h4>
      <h5>h5</h5>
      <h5>{pangram}</h5>
      <h6>h6</h6>
      <h6>{pangram}</h6>
      <p>p</p>
      <p>{pangram}</p>
    </div>
  );
};
