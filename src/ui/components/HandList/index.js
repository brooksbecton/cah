import React from "react";
import PropTypes from "prop-types";
import Meta from "./../../Context/Meta";

const HandList = ({ cardList, playCard }) => (
  <Meta.Consumer>
    {({ ctx, playerID }) => (
      <ol>
        {cardList
          .filter(({ playerID: ownerID }) => ownerID === playerID)
          .map(card => {
            return (
              <li key={card.text}>
                {card.text}
                <button
                  disabled={ctx.phase !== "play phase"}
                  onClick={() => playCard(card)}
                >
                  Play Card
                </button>
              </li>
            );
          })}
      </ol>
    )}
  </Meta.Consumer>
);

HandList.propTypes = {
  cardList: PropTypes.arrayOf(PropTypes.string),
  playCard: PropTypes.func
};

HandList.defaultProps = {
  cardList: []
};

export default HandList;
