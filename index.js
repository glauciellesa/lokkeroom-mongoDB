import express from "express";
import config from "./src/configs/config.js";
import userMiddlewar from "./src/middlewares/userMiddleware.js";
import usersControllers from "./src/controllers/userController.js";
import lobbyControllers from "./src/controllers/lobbyController.js";
import messageController from "./src/controllers/messageController.js";

const app = express();

app.use(userMiddlewar);
app.use(usersControllers);
app.use(lobbyControllers);
app.use(messageController);

app.listen(config.port, () => {
  console.log(`I'm using ${config.port} to run server`);
});
