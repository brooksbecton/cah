import React, { Component } from "react";
import {IRooms} from "./../../../types/IRooms";

interface IState {
  name: string;
}

interface IProps {
  rooms: IRooms;
  joinGame: (gameID: string, playerID: number, playerName: string) => void;
}

export class RoomList extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { name: "" };
  }

  public joinGame = (
    gameID: string,
    playerName = this.state.name,
    rooms = this.props.rooms,
  ) => {
    const room = rooms
      .filter(({ gameID: tempGameID }) => tempGameID !== gameID)
      .pop();
    const openPlayer = room.players.filter((p) => p.name === undefined)[0];
    const playerID = openPlayer.id;

    this.props.joinGame(gameID, playerID, playerName);
  }

  public render() {
    return (
      <>
        {this.props.rooms.map((room) => (
          <li key={room.gameID}>
            <span>{room.gameID}</span>
            <p>Players</p>
            <ul>
              {room.players
                .filter(({ name }) => name !== undefined)
                .map(({ id, name }) => (
                  <li key={id}>{name}</li>
                ))}
              <li>
                <input
                  onChange={(e) => this.setState({ name: e.target.value })}
                  placeholder="Enter Name"
                />
                <button onClick={() => this.joinGame(room.gameID)}>Join</button>
              </li>
            </ul>
          </li>
        ))}
      </>
    );
  }
}
