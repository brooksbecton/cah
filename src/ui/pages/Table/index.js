import { Client } from "boardgame.io/react";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "react-toastify/dist/ReactToastify.css";

import DrawCardButton from "./../../components/DrawCardButton";
import { HandList } from "./HandList";
import PlayedCardsList from "../../components/PlayedCardList";
import { Meta } from "./../../Context/Meta";
import game from "./../../../game";
import { WhiteCard } from "./WhiteCard";
import { PhaseToast } from "./PhaseToast";
import { filterPlayersCards } from "../../../utils/filterPlayersCards";
import { Table } from "./Table";


class TableSeat extends Component {
  render() {
    const Cah = Client({
      board: Table,
      game: game,
      multiplayer: { server: "http://localhost:5555" }
    });

    return (
      <Cah
        gameID={this.props.match.params.gameID}
        credentials={this.props.match.params.playerCredentials}
        playerID={this.props.match.params.playerID}
      />
    );
  }
}
export default withRouter(TableSeat);
