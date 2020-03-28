import * as React from "react";

export interface IProps {
  text: string;
}

export const WhiteCard: React.FC<IProps> = ({ text }) => {
  return (
    <div
      style={{
        alignItems: "flex-start",
        backgroundColor: "white",
        borderColor: "#707070",
        borderStyle: "solid",
        borderWidth: 1,
        color: "black",
        display: "flex",
        flexDirection: "column",
        fontWeight: "bold",
        height: 50,
        marginBottom: 20,
        padding: 10
      }}
    >
      <p style={{ margin: 0 }}>{text}</p>
    </div>
  );
};
