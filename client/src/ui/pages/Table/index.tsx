import { Client } from "boardgame.io/react";
import { useRouteMatch } from "react-router-dom";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { SocketIO } from "boardgame.io/multiplayer";

import game from "./../../../game/game";
import { Table } from "./Table";
import { serverUrl } from "./../../../config/serverUrl";

const TableSeat = () => {
  const match = useRouteMatch<{
    gameID: string;
    playerCredentials: string;
    playerID: string;
  }>();
  const Cah = Client({
    board: Table,
    game: game,
    multiplayer: SocketIO({ server: serverUrl }),
    debug: true,
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
