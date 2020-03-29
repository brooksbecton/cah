import { Client } from "boardgame.io/react";
import { useRouteMatch } from "react-router-dom";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { SocketIO } from "boardgame.io/multiplayer";

import game from "../../../game";
import { Table } from "./Table";

const TableSeat = () => {
  const match = useRouteMatch<{
    gameID: string;
    playerCredentials: string;
    playerID: string;
  }>();
  const Cah = Client({
    board: Table,
    game: game,
    multiplayer: SocketIO({ server: window.location.origin }),
    debug: false
  });

  return (
    <Cah
      gameID={match.params.gameID}
      credentials={match.params.playerCredentials}
      playerID={match.params.playerID}
    />
  );
};
export default TableSeat;
