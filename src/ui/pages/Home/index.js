import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
class Home extends Component {
  state = {
    gameID: null,
    numPlayers: 0
  };
  constructor(props) {
    super(props);
  }

  renderInvites = () => {
    let invites = [];
    for (let i = 0; i < this.state.numPlayers; i++) {
      invites.push(
        <React.Fragment>
          <Link to={`/game/${this.state.gameID}/${this.state.numPlayers}/${i}`}>
            {`Player ${i}`}
          </Link>
          <br />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <h3>Game ID: {this.state.gameID}</h3>
        {invites.map(invite => invite)}
      </React.Fragment>
    );
  };

  render() {
    return (
      <div>
        <h1>Home</h1>

        <h2>Join Game</h2>
        <label>
          Game ID
          <input
            type="text"
            onChange={e => this.setState({ gameID: e.target.value })}
          />
        </label>
        <label>
          Number of Players
          <input
            type="text"
            onChange={e => this.setState({ numPlayers: e.target.value })}
          />
        </label>
        <br />
        {this.state.gameID !== null && this.renderInvites()}
      </div>
    );
  }
}

export default withRouter(Home);
