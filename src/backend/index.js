import express from "express";
import config from "./configs/config.js";
import userMiddlewar from "./middlewares/userMiddleware.js";
import usersControllers from "./controllers/userController.js";
import lobbyControllers from "./controllers/lobbyController.js";
import messageController from "./controllers/messageController.js";

const app = express();

app.use(userMiddlewar);
app.use(usersControllers);
app.use(lobbyControllers);
app.use(messageController);

app.listen(config.port, () => {
  console.log(`I'm using ${config.port} to run server`);
});
