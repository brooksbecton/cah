import React from "react";
import Proptypes from "prop-types";
const DrawCardButton = ({ onClick }) => {
  return <button onClick={onClick}>Draw Card</button>;
};

DrawCardButton.proptypes = {
  onClick: Proptypes.func
};

export default DrawCardButton;
