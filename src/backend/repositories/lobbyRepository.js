import { ObjectId } from "mongodb";
import Lobby from "../models/Lobby.js";

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

const getMessagesInLobby = async (lobbyId) => {
  try {
    const lobby = await Lobby.findById(lobbyId).populate(
      "messages.sender.first_name"
    );

    if (!lobby) {
      console.log("Lobby not found");
      return [];
    }

    const messages = lobby.messages;
    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
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

const getLobbyMessage = async (lobbyId, messageId) => {
  try {
    const lobby = await Lobby.findOne(
      {
        _id: new ObjectId(lobbyId),
        "messages._id": new ObjectId(messageId),
      },
      {
        "messages.$": 1, //retrieve only the matching message within the messages array.
      }
    );

    if (!lobby) {
      console.log("Lobby or message not found");
      return null;
    }
    return lobby.messages[0]; // Return the specific message */
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

export default {
  createNewLobby,
  getAllLobby,
  getMessagesInLobby,
  createMessageInLobby,
  getLobbyMessage,
};
