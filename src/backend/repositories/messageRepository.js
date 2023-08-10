import connection from "./connection.js";

const isOwner = (clienteRequestId, messageId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM user_message_lobby WHERE sender_user_id = ? AND id = ?",
      [clienteRequestId, messageId],
      (err, results) => {
        if (results.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    );
  });
};

const editMessage = (editedMessage, messageId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE user_message_lobby SET message = ? WHERE id = ?",
      [editedMessage.message, messageId],
      (error, results) => {
        if (results?.affectedRows > 0) {
          resolve(results);
        } else {
          console.log({ error });
          reject(new Error("Message was not updated"));
        }
      }
    );
  });
};

const deleteMessage = (messageId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM user_message_lobby WHERE id=?",
      [messageId],
      (err, results) => {
        if (results.affectedRows > 0) {
          resolve(messageId);
        } else {
          console.log(err);
          reject(new Error("Message id does not exist"));
        }
      }
    );
  });
};

export default { isOwner, deleteMessage, editMessage };
