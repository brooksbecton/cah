import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
class Home extends Component {
  state = {
    gameID: null
  };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Home</h1>

        <h2>Join Game</h2>
        <form>
          <label>
            Game ID
            <input
              type="text"
              onChange={e => this.setState({ gameID: e.target.value })}
            />
          </label>
          <br />
          {this.state.gameID !== null && (
            <Link to={"localhost:5555/game/" + this.state.gameID}>
              {"localhost:5555/game/" + this.state.gameID}
            </Link>
          )}
        </form>
      </div>
    );
  }
}

export default withRouter(Home);
