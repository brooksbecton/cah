import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
class Home extends Component {
  state = {
    gameID: null
  };
  constructor(props) {
    super(props);
  }

  createGame = () => {
    fetch("http://localhost:5556/games/default/create", {
      method: "POST",
      body: JSON.stringify({
        numPlayers: 3
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

        <h2>Join Game</h2>
        <label>
          Game ID
          <input
            type="text"
            onChange={e => this.setState({ gameID: e.target.value })}
          />
        </label>
        <button onClick={this.createGame}>Create Game</button>
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
