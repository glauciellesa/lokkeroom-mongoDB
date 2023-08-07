import connection from "./connection.js";

const getAllLobby = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM lobby", (err, results) => {
      if (!results?.length) {
        reject(new Error("Lobby id does not exist"));
      } else {
        resolve(results);
      }
    });
  });
};

const getAllLobbyMessage = (lobbyId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM user_message_lobby WHERE target_lobby_id = ?",
      [lobbyId],
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

const createLobbyMessage = (lobbyData, userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO user_message_lobby(sender_user_id, target_lobby_id, message, create_date) VALUES (?,?,?,?)",
      [
        userId,
        lobbyData.target_lobby_id,
        lobbyData.message,
        lobbyData.create_date,
      ],
      (error, results) => {
        if (results.affectedRows > 0) {
          resolve(results.insertId);
        } else {
          reject(new Error("Message was not inserted"));
        }
      }
    );
  });
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
  getAllLobby,
  getAllLobbyMessage,
  createLobbyMessage,
  getLobbyMessage,
};
