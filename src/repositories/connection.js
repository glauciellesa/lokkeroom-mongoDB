/* // get the client
import mysql from "mysql2";

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "root",
  database: "lokkeroom",
});

export default connection; */

import mongoose from "mongoose";

const connection = mongoose
  .connect(
    "mongodb+srv://root:root@atlascluster.l9wb5cn.mongodb.net/lokkeroom?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to mongoDB!"))
  .catch((error) => {
    console.log(error);
  });

export default connection;
