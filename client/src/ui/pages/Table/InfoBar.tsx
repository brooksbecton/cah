import * as React from "react";
import styled from "styled-components";

export const InfoBar: React.FC = () => {
  return (
    <Container>
      <PlayersList>
        <li>Brooks: 5</li>
        <li>Hope: 4</li>
        <li>Peyton: 3</li>
        <li>Harvey: 0</li>
      </PlayersList>
      <p>Vote</p>
    </Container>
  );
};

const Container = styled.aside`
  display: flex;
  flex-direction: column;

  justify-content: space-between;

  width: 25px;
  height: calc(100% - 60px);
  align-items: center;

  background-color: ${({ theme }) => theme.colors.white};
  padding: 5px;
  padding-bottom: 30px;
  padding-top: 30px;
  p {
    margin: 0;
    writing-mode: vertical-rl;
  }
`;

const PlayersList = styled.ul`
  padding: 0;
  margin: 0;

  li {
    writing-mode: vertical-rl;
    list-style: none;

    margin-bottom: 25px;
    font-weight: lighter;
  }
`;
