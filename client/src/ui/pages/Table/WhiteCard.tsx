import * as React from "react";
import styled from "styled-components";
import { useTheme } from "./useTheme";
export interface IProps {
  author?: string;
  text: string;
  draggable?: boolean;
  winner?: boolean;
}

export const WhiteCard: React.FC<IProps> = ({
  author = "",
  text,
  draggable = true,
  winner = false,
}) => {
  const theme = useTheme();

  return (
    <Card draggable={draggable}>
      <div style={{ padding: 10 }}>
        <Text dangerouslySetInnerHTML={{ __html: text }}></Text>
        <Author>{author}</Author>
      </div>
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
  margin: 0px;
`;

const Author = styled(Text)`
  color: ${({ theme }) => theme.colors.grey};
  margin: 0;
  padding: 0;
`;

const WinnerMarker = styled.div`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.grey};
  height: 100%;
  flex: 1;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.whiteCard.bg};

  border-style: solid;
  border-width: 1px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  width: 30vw;
  height: 70px;
  margin-bottom: 20px;
`;
