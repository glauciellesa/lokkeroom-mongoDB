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
  users: [
    {
      user_id: { type: mongoose.Types.ObjectId, ref: User },
      role: {
        type: String,
        trim: true,
        required: true,
        validate: [validator.isNotEmpty, "Lobby name is empty"],
      },
    },
  ],
  message: [
    {
      sender: { type: mongoose.Types.ObjectId, ref: User },
      message_body: {
        type: String,
        required: true,
        trim: true,
        validate: [validator.isNotEmpty, "Message is empty"],
      },
      created_at: { type: Date, default: Date.now },
      updated_at: { type: Date, default: Date.now },
    },
  ],
});

const Lobby = mongoose.model("Lobby", lobbiesSchema);

export default { Lobby, Role, UserLobbyRole };
