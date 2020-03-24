import React, { useContext } from "react";

import { Meta } from "../Context/Meta";
import { filterPlayersCards } from "../../utils/filterPlayersCards";

interface IProps {
  onClick: () => void;
}

const DrawCardButton: React.FC<IProps> = ({ onClick }) => {
  const { G, ctx, playerId } = useContext(Meta);

  return (
    <button
      disabled={
        ctx.phase !== "draw" ||
        filterPlayersCards(G.hand, playerId).length >= 10
      }
      data-test-id="draw-card-button"
      onClick={onClick}
    >
      Draw Card
    </button>
  );
};

export default DrawCardButton;
