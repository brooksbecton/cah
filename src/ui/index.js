import React, { Component } from "react";
import DrawCardButton from "./components/DrawCardButton";
import HandList from "./components/HandList";

import Meta from "./Context/Meta";
class Table extends Component {
  render() {
    return (
      <React.Fragment>
        <Meta.Provider
          value={{ playerID: this.props.playerID, gameID: this.props.gameID }}
        >
          <h2>Table!</h2>
          <h3>{this.props.ctx.phase}</h3>
          <DrawCardButton onClick={() => this.props.moves.drawCard(this.props.playerID)} />
          <h3>Hand {this.props.G.hand.length} cards</h3>
          <HandList
            playCard={cardText => this.props.moves.playCard(cardText)}
            cardList={this.props.G.hand}
          />
          <h3>Played Cards</h3>
          <ul>
            {this.props.G.playedCards.map(cardText => (
              <li key={cardText}>{cardText}</li>
            ))}
          </ul>
        </Meta.Provider>
        <button onClick={() => this.props.events.endTurn()}>End Turn</button>
        <button onClick={() => this.props.events.endPhase()}>End Phase</button>
      </React.Fragment>
    );
  }
}

export default Table;
