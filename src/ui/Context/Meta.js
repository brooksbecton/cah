import React from "react";

const defaultMetaValues = {
  gameID: "",
  playerID: "",
};

/**
 * Holds meta information about the current game
 *
 * playerID
 * gameID
 */
const Meta = React.createContext(defaultMetaValues);

export default Meta;
