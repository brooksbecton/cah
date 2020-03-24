import React, { useState, Component } from "react";
import { IRoom } from "../../../types/IRoom";

interface IProps {
  rooms: IRoom[];
  joinGame: (gameID: string, playerID: number, playerName: string) => Promise<void>;
}

export const RoomList: React.FC<IProps> = props => {
  const [playerName, setPlayerName] = useState("");

  const handleJoinGame = (room: IRoom) => {
    const [openPlayer] = room.players.filter(p => p.name === undefined);

    props.joinGame(room.gameID, openPlayer.id, playerName);
  };

  return (
    <>
      {props.rooms.map(room => (
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
                onChange={e => setPlayerName(e.target.value)}
                placeholder="Enter Name"
              />
              <button onClick={() => handleJoinGame(room)}>Join</button>
            </li>
          </ul>
        </li>
      ))}
    </>
  );
};
