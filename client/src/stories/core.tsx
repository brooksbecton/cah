import * as React from "react";
import styled from "styled-components";

const Square = styled.div`
  height: 100px;
  width: 100px;
`;

const Blue = styled(Square)`
  background-color: ${({ theme }) => theme.colors.blue};
`;
Blue.displayName = "Blue";
const White = styled(Square)`
  background-color: ${({ theme }) => theme.colors.white};
`;
White.displayName = "White";
const Black = styled(Square)`
  background-color: ${({ theme }) => theme.colors.black};
`;
Black.displayName = "Black";
const Grey = styled(Square)`
  background-color: ${({ theme }) => theme.colors.grey};
`;
Grey.displayName = "Grey";
const LightGrey = styled(Square)`
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;
LightGrey.displayName = "LightGrey";

export const Colors = () => {
  const colorComponents = [Blue, White, Black, Grey, LightGrey];

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {colorComponents.map((Color, i) => {
        return (
          <div key={i}>
            <p>{Color.displayName}</p>
            <Color />
          </div>
        );
      })}
    </div>
  );
};
