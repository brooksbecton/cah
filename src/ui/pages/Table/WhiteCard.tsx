import * as React from "react";

export interface IProps {
  cardText: string;
}

export const WhiteCard: React.SFC<IProps> = ({ cardText }) => {
  return <p>{cardText}</p>;
};
