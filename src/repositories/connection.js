import mongoose from "mongoose";
import config from "../configs/config.js";

const connection = mongoose
  .connect(
    `mongodb+srv://${config.adm}:${config.password}@atlascluster.l9wb5cn.mongodb.net/lokkeroom?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to mongoDB!"))
  .catch((error) => {
    console.log(error);
  });

export default connection;
