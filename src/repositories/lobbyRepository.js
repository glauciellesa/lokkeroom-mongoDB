import Lobby from "../models/Lobby.js";
import connection from "./connection.js";

const createNewLobby = (clientData, clientId) => {
  //.create() method returns a promise
  return Lobby.create({
    lobby_name: clientData.lobby_name,
    users: [
      {
        user_id: clientId,
        role: "coach",
      },
    ],
    messages: [],
  });
};

const getAllLobby = async () => {
  return await Lobby.find({});
};

const getAllLobbyMessage = async (lobbyId) => {
  return await Lobby.findById(lobbyId);
};

const createMessageInLobby = (lobbyId, message, clientId) => {
  const newMessage = {
    sender: clientId,
    message_body: message,
  };

  return Lobby.findOneAndUpdate(
    { _id: lobbyId },
    { $push: { messages: newMessage } }
  );
};

const getLobbyMessage = (lobbyId, messageId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM user_message_lobby WHERE target_lobby_id=? and id=?",
      [lobbyId, messageId],
      (err, results) => {
        if (!results?.length) {
          reject(new Error("Lobby id does not exist"));
        } else {
          resolve(results);
        }
      }
    );
  });
};

export default {
  createNewLobby,
  getAllLobby,
  getAllLobbyMessage,
  createMessageInLobby,
  getLobbyMessage,
};
