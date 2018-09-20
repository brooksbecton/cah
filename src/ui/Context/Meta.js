import React from 'react';

const defaultMetaValues = {
    playerID: "",
    gameID: ""
};

/**
 * Holds meta information about the current game
 *
 * playerID
 * gameID
 */
const Meta = React.createContext(defaultMetaValues);

export default Meta;
