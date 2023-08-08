import express from "express";
import { verifyToken } from "../services/authService.js";
import lobbyRepo from "../repositories/lobbyRepository.js";

const router = express.Router();

//Check to make sure header is not undefined, if so, return Forbidden (403)
router.use(verifyToken);

router.post("/api/lobby", async (req, res) => {
  const clienteRequestId = req.user.id;
  try {
    const lobby = await lobbyRepo.createNewLobby(req.body, clienteRequestId);
    res.status(200).json({ lobby }).end();
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.get("/api/lobby", async (req, res) => {
  try {
    const lobbies = await lobbyRepo.getAllLobby();
    res.status(200).json({ lobbies }).end();
  } catch (error) {
    res.status(404).json(error.message); //Not Found
  }
});

router.get("/api/lobby/:lobbyId", async (req, res) => {
  const lobbyId = req.params.lobbyId;

  try {
    const lobby = await lobbyRepo.getAllLobbyMessage(lobbyId);
    res.status(200).location(`/api/register/${lobbyId}`).json({ lobby }).end();
  } catch (error) {
    res.status(404).json("Id does not exist.");
  }
});

router.post("/api/lobby/:lobbyId", async (req, res) => {
  try {
    const id = await lobbyRepo.createLobbyMessage(req.body, req.user.id);
    res.status(201).json({ id }).end();
  } catch (error) {
    console.log({ error });
    res.status(400).json(error.message);
  }
});

router.get("/api/lobby/:lobbyId/message/:messageId", async (req, res) => {
  const lobbyId = req.params.lobbyId;
  const messageId = req.params.messageId;
  try {
    const data = await lobbyRepo.getLobbyMessage(lobbyId, messageId);
    res.status(200).json({ data }).end();
  } catch (error) {
    res.status(404).json(error.message);
  }
});

export default router;
