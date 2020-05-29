import * as React from "react";
import styled from "styled-components";
import { useTheme } from "./useTheme";
export interface IProps {
  text: string;
  draggable?: boolean;
  winner?: boolean;
}

export const WhiteCard: React.FC<IProps> = ({
  text,
  draggable = true,
  winner = false,
}) => {
  const theme = useTheme();

  return (
    <Card draggable={draggable}>
      <Text style={{ margin: 0, padding: 10 }}>{text}</Text>
      <div
        style={{
          display: "flex",
          alignSelf: "center",
        }}
      >
        {draggable && (
          <svg
            style={{ paddingRight: 10 }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              fill={draggable ? theme.colors.blue : theme.colors.grey}
              d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
            />
          </svg>
        )}
        {winner && (
          <WinnerMarker data-test-id="winner-card">
            <p>W</p>
          </WinnerMarker>
        )}
      </div>
    </Card>
  );
};
const Text = styled.p`
  color: ${({ theme }) => theme.whiteCard.fg};
  font-weight: bold;
  padding: 10px;
`;

const WinnerMarker = styled.div`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.grey};
  height: 100%;
  flex: 1;
`;

const Card = styled.div`
  background-color: ${({ theme, draggable }) => {
    if (draggable) {
      return theme.colors.white;
    } else {
      return theme.colors.lightGrey;
    }
  }};

  border-color: ${({ draggable }) => {
    return draggable ? "#707070" : "#5B5757";
  }};
  border-style: solid;
  border-width: 1px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  height: 70px;
  margin-bottom: 20px;
`;