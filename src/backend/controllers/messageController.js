import express from "express";
import userRepo from "../repositories/userRepository.js";
import messageRepo from "../repositories/messageRepository.js";

const router = express.Router();

router.patch("/api/lobby/:lobbyId/message/:messageId", async (req, res) => {
  const clienteRequestId = req.user.id;
  const messageId = req.params.messageId;
  const isAdm = await userRepo.isUserAdmin(clienteRequestId);
  const isOwner = await messageRepo.isOwner(clienteRequestId, messageId);
  const editedMessage = req.body;
  try {
    if (isAdm || isOwner) {
      await messageRepo.editMessage(editedMessage, messageId);
      res.status(200).json({ messageId }).end();
    } else {
      res
        .status(401)
        .json("You dont have permission to edit this message")
        .end();
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.delete("/api/lobby/:lobbyId/message/:messageId", async (req, res) => {
  //é preciso saber o lobby
  const clienteRequestId = req.user.id;
  const messageId = req.params.messageId;
  const isAdm = await userRepo.isUserAdmin(clienteRequestId);

  try {
    if (isAdm) {
      await messageRepo.deleteMessage(messageId);
      res.status(200).json({ messageId }).end();
    } else {
      res.status(401).json("You dont have permission to delete message").end();
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
});

export default router;
