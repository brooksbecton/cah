import * as React from "react";

interface IProps {
    text: string;
}

export const BlackCardArea = ({ text }: IProps) => {
    return (
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          height: 95,
          padding: 10,
          width: "100%",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold" }}>{text}</p>
      </div>
    );
  };
