import User from "../models/User.js";
import connection from "./connection.js";
import bcrypt from "bcrypt";

const isUserAdmin = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT r.role_name  FROM user_lobby ul  INNER  JOIN roles r ON r.id = ul.role_id WHERE ul.user_id = ?",
      [userId],
      (err, results, fields) => {
        if (results[0].role_name == "coach") {
          console.log("You are ADM");
          resolve(true);
        } else {
          console.log("You are not an ADM");
          resolve(false);
        }
      }
    );
  });
};

const getUserByEmail = async (email) => {
  const query = await User.findOne({ email: email }).exec();
  if (query) {
    return true;
  } else {
    return false;
  }
};

const registerUser = (user) => {
  //.create() method returns a promise
  return User.create({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: user.password,
  });
};

const existUser = async (userData) => {
  const query = User.find({ email: userData.email });
  const user = await query.exec();
  let match = false;

  if (user.length > 0) {
    match = await bcrypt.compare(userData.password, user[0].password);
    console.log({ match });
  }

  if (user.length > 0 && match) {
    return true;
  } else {
    return false;
  }
};

const getUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM users", (err, results, fields) => {
      resolve(results);
    });
  });
};

const getUser = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE id = ?",
      [userId],
      (err, results, fields) => {
        if (results.length > 0) {
          resolve(results);
        } else {
          reject(new Error("This user does not exist"));
        }
      }
    );
  });
};

const getUserSameLobby = (clienteRequestId, userId) => {
  console.log({ clienteRequestId }, { userId });
  return new Promise((resolve, reject) => {
    connection.query(
      `WITH 
      clientLobby AS (
        SELECT ul.lobby_id FROM user_lobby ul WHERE ul.user_id = ?
      ),
      userLobby AS (
        SELECT ul.lobby_id FROM user_lobby ul WHERE ul.user_id = ?
      )
      SELECT DISTINCT  u.* 
      FROM users u 
      INNER JOIN user_lobby ul ON u.id = ul.user_id 
      WHERE ul.lobby_id IN (SELECT lobby_id FROM clientLobby)
      AND ul.lobby_id IN (SELECT lobby_id FROM userLobby)
      AND u.id = ?`,
      [clienteRequestId, userId, userId],
      (err, results) => {
        if (results.length > 0) {
          resolve(results);
        } else {
          reject(new Error("You do not have permission to see this use"));
        }
      }
    );
  });
};

const addUserIntoLobby = (lobbyId, userLobbyData) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO user_lobby(user_id, lobby_id, role_id) VALUES (?,?,?)",
      [userLobbyData.user_id, lobbyId, userLobbyData.role_id],
      (err, results) => {
        if (results.affectedRows > 0) {
          resolve(results);
        } else {
          reject(new Error("User was not inserted to table user_lobby"));
        }
      }
    );
  });
};

const removeUserFromLobby = (lobbyId, userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM user_lobby WHERE lobby_id=? AND user_id=? ",
      [lobbyId, userId],
      (error, results) => {
        if (results.affectedRows > 0) {
          resolve(userId);
        } else {
          console.log(error);
          reject(new Error("User does not exist in this Lobby"));
        }
      }
    );
  });
};

export default {
  getUsers,
  registerUser,
  existUser,
  getUserByEmail,
  isUserAdmin,
  getUser,
  getUserSameLobby,
  addUserIntoLobby,
  removeUserFromLobby,
};
