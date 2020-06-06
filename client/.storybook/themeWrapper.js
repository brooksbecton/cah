// themeDecorator.js
import React from "react"
import { ThemeProvider } from "styled-components";

import { classic } from "./../src/ui/pages/Table/useTheme";

export const ThemeDecorator = storyFn => (
  <ThemeProvider theme={classic}>{storyFn()}</ThemeProvider>
)

