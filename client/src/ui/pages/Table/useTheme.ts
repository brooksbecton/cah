import { useContext } from "react";
import { ThemeContext } from "styled-components";

export const classic = {
  font: {
    
  },
  colors: {
    blue: "#0064CD",
    white: "#FFF"
  },
  padding: "28px",
  whiteCard: {
    bg: "#F4F4F4",
    fg: "#2F2E2E"
  },
  blackCard: {
    fg: "#F4F4F4",
    bg: "#2F2E2E"
  }
};

export function useTheme(): typeof classic {
  const theme = useContext<typeof classic>(ThemeContext);
  return theme;
}
