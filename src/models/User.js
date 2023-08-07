import mongoose from "mongoose";
import validator from "../validators/validator.js";

const Schema = mongoose.Schema;

const usersSchema = new Schema({
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

export default { User };
