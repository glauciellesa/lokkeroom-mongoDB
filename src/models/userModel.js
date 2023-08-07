import mongoose from "mongoose";
import validator from "../validators/validator.js";

const usersSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    validate: [validator.isNotEmpty, "First name is empty"],
  },
  last_name: {
    type: String,
    required: true,
    validate: [validator.isNotEmpty, "Last name is empty"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validator.validateEmail, "Please fill a valid email address"],
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    validate: [validator.isNotEmpty, "Password is empty"],
  },
});

const User = mongoose.model("User", usersSchema);

const rolesSchema = mongoose.Schema({
  role_name: {
    type: String,
    trim: true,
    required: true,
    validate: [validator.isNotEmpty, "Role is empty"],
  },
});

const Role = mongoose.model("Role", rolesSchema);

const lobbiesSchema = mongoose.Schema({
  lobby_name: {
    type: String,
    trim: true,
    required: true,
    validate: [validator.isNotEmpty, "Lobby name is empty"],
  },
});

const Lobby = mongoose.model("Lobby", lobbiesSchema);

const userLobbyRoleSchema = mongoose.Schema({
  User: { type: mongoose.Types.ObjectId, ref: "User" },
  Lobby: { type: mongoose.Types.ObjectId, ref: "Lobby" },
  Role: { type: mongoose.Types.ObjectId, ref: "Role" },
});

const UserLobbyRole = mongoose.model("UserLobbyRole", userLobbyRoleSchema);

const userMessageLobbySchema = mongoose.Schema({
  sender: { type: mongoose.Types.ObjectId, ref: "User" },
  target_user: { type: mongoose.Types.ObjectId, ref: "User" },
  message: {
    type: String,
    required: true,
    trim: true,
    validate: [validator.isNotEmpty, "Message is empty"],
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const UserMessageLobby = mongoose.model(
  "UserMessageLobby",
  userMessageLobbySchema
);

export default { User, Lobby, Role, UserLobbyRole, UserMessageLobby };
