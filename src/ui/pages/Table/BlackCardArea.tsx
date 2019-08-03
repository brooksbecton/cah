import * as React from "react";
import { Droppable } from "react-beautiful-dnd";

interface IProps {
  text: string;
}

export const BlackCardArea = ({ text }: IProps) => {
  return (
    <Droppable droppableId="black-card-area">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
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
          </div>{" "}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
