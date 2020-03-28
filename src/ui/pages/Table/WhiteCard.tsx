import * as React from "react";
import styled from "styled-components";
import { useTheme } from "./useTheme";
export interface IProps {
  text: string;
}

export const WhiteCard: React.FC<IProps> = ({ text }) => {
  const theme = useTheme();

  return (
    <Card>
      <Text style={{ margin: 0 }}>{text}</Text>
      <div
        style={{
          display: "flex",
          alignSelf: "center"
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            fill={theme.colors.blue}
            d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
          />
        </svg>
      </div>
    </Card>
  );
};
const Text = styled.p`
  color: ${({ theme }) => theme.whiteCard.fg};
`;

const Card = styled.div`
  align-items: flex-start;
  background-color: ${({ theme }) => theme.colors.white};
  border-color: #707070;
  border-style: solid;
  border-width: 1px;
  display: flex;
  flex-direction: row;
  font-weight: bold;
  height: 50px;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
`;
