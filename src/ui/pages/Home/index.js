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

  createGame = (numPlayers = this.state.numPlayers) => {
    fetch("http://localhost:5556/games/default/create", {
      method: "POST",
      body: JSON.stringify({
        numPlayers: this.state.numPlayers
      })
    })
      .then(resp => resp.json())
      .then(({ gameID }) => {
        this.setState({ gameID });
      });
  };

  render() {
    return (
      <div>
        <h1>Home</h1>
        // Need to add join endpoint and pass credentials to client
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
            onChange={e => {
              const numPlayers = Number(e.target.value);
              if (numPlayers > 0 && numPlayers < 20) {
                this.setState({ numPlayers: e.target.value });
              }
            }}
          />
        </label>

        <button onClick={() => this.createGame()}>Create Game</button>
        <br />
        {this.state.gameID !== null && (
          <React.Fragment>
            <h3>Game ID: {this.state.gameID}</h3>
            <Link to={"/game/" + this.state.gameID + "/0"}>
              {"localhost:5555/game/" + this.state.gameID + "/0"}
            </Link>
            <br />
            <Link to={"/game/" + this.state.gameID + "/1"}>
              {"localhost:5555/game/" + this.state.gameID + "/1"}
            </Link>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(Home);
