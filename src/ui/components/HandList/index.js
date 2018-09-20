import React from "react";
import PropTypes from "prop-types";
import Meta from "./../../Context/Meta";

const HandList = ({ cardList, playCard }) => (
  <Meta.Consumer>
    {({ playerID }) => (
      <ul>
        {cardList.map(card => {
          return (
            <li key={card.text}>
              {card.text}
              <button onClick={() => playCard(card)}>Play Card</button>
            </li>
          );
        })}
      </ul>
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
