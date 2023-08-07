import mongoose from "mongoose";
import validator from "../validators/validator.js";
import User from "./User.js";

const Schema = mongoose.Schema;

const lobbiesSchema = Schema({
  lobby_name: {
    type: String,
    trim: true,
    required: true,
    validate: [validator.isNotEmpty, "Lobby name is empty"],
  },
});

const Lobby = mongoose.model("Lobby", lobbiesSchema);

const rolesSchema = Schema({
  roles_name: {
    type: String,
    trim: true,
    required: true,
    validate: [validator.isNotEmpty, "Role name is empty"],
  },
});

const Role = mongoose.model("Role", rolesSchema);

const userLobbyRoleSchema = Schema({
  User: { type: mongoose.Types.ObjectId, ref: User },
  Lobby: { type: mongoose.Types.ObjectId, ref: "Lobby" },
  Role: { type: mongoose.Types.ObjectId, ref: "Role" },
});

const UserLobbyRole = mongoose.model("UserLobbyRole", userLobbyRoleSchema);

export default { Lobby, Role, UserLobbyRole };
