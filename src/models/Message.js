import validator from "../validators/validator.js";
import mongoose from "mongoose";
import User from "./User.js";

const Schema = mongoose.Schema;

const userMessageLobbySchema = new Schema({
  sender: { type: mongoose.Types.ObjectId, ref: User },
  target_user: { type: mongoose.Types.ObjectId, ref: User },
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
