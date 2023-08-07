import connection from "./connection.js";

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

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, results, fields) => {
        resolve(results[0]);
      }
    );
  });
};

const registerUser = (user) => {
  console.log({ user });
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO users(first_name, last_name, email, password) VALUES (?,?,?,?)",
      [user.first_name, user.last_name, user.email, user.password],
      (error, results) => {
        if (results.affectedRows > 0) {
          resolve(results.insertId);
        } else {
          reject(new Error("User not registered"));
        }
      }
    );
  });
};

const existUser = (userData) => {
  const { email } = userData;
  const { password } = userData;
  console.log({ email }, { password });
  //checking to make sure the user entered the correct username/password combo
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password],
      (err, results) => {
        if (!results?.length) {
          reject(new Error("Email or password does not exist"));
        } else {
          if (results.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      }
    );
  });
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
