import Lobby from "../models/Lobby.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

const isUserCoachInLobby = async (userId, lobbyId) => {
  const lobby = await Lobby.findOne({
    _id: new ObjectId(lobbyId),
    "users.role": "coach",
  });
  if (lobby) {
    const coachUser = await lobby.users.find((user) => user.role === "coach");
    return coachUser && coachUser.user_id.toString() === userId;
  } else {
    return false; // No lobby with a coach user found
  }
};

const checkeIfEmailExist = async (email) => {
  const query = await User.findOne({ email: email }).exec();
  if (query) {
    return true;
  } else {
    return false;
  }
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email: email }).exec();
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
  }

  if (user.length > 0 && match) {
    return true;
  } else {
    return false;
  }
};

const getUsers = async () => {
  return await User.find({});
};

const getUser = async (userId) => {
  return await User.findById(userId);
};

const getUserSameLobby = async (clientRequestId, userId, loobyId) => {
  //clientID and userId is in the same lobby?
  const client = await Lobby.findOne({
    "users.user_id": new ObjectId(clientRequestId),
  });
  const user = await Lobby.findOne({
    "users.user_id": new ObjectId(userId),
  });

  if (client?.lobby_name === user?.lobby_name) {
    return User.findById(userId);
  } else {
    return "You do not have permission to see this user";
  }
};

const existUserInLobby = async (lobbyId, userId) => {
  const lobby = await Lobby.findOne({
    _id: new ObjectId(lobbyId),
    "users.user_id": new ObjectId(userId),
  }).exec();
  return !!lobby; // Return true if user exists in the lobby, false if not
};

const addUserIntoLobby = async (lobbyId, userId) => {
  if (!userId) {
    return "Type a userId";
  } else {
    const newUser = {
      user_id: userId,
      role: "regular_user",
    };
    //check if userId already exist into the lobby
    const existUser = await existUserInLobby(lobbyId, userId);
    console.log({ newUser });
    if (!existUser) {
      return Lobby.findOneAndUpdate(
        { _id: lobbyId },
        { $push: { users: newUser } }
      );
    } else {
      return "This user exist already into this looby";
    }
  }
};

const removeUserFromLobby = async (lobbyId, userId) => {
  try {
    const result = await Lobby.updateOne(
      { _id: new ObjectId(lobbyId) },
      { $pull: { users: { user_id: new ObjectId(userId) } } }
    );
  } catch (error) {
    console.error("Error removing user:", error);
    throw error;
  }
};

export default {
  isUserCoachInLobby,
  checkeIfEmailExist,
  getUsers,
  registerUser,
  existUser,
  getUserByEmail,
  getUser,
  getUserSameLobby,
  addUserIntoLobby,
  removeUserFromLobby,
};
