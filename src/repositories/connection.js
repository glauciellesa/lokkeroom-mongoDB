import mongoose from "mongoose";
import config from "../configs/config";

const connection = mongoose
  .connect(
    `mongodb+srv://root:${config.password}@atlascluster.l9wb5cn.mongodb.net/lokkeroom?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to mongoDB!"))
  .catch((error) => {
    console.log(error);
  });

export default connection;
