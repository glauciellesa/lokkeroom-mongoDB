import express from "express";
import repository from "../repositories/userRepository.js";
import jwt from "jsonwebtoken";
import { verifyToken } from "../services/authService.js";
import validator from "../validators/validator.js";

const router = express.Router();

/* router.get("/", async (req, res) => {
  res.send("hello world");
}); */

router.post("/api/register", async (req, res) => {
  try {
    const id = await repository.registerUser(req.body);
    res.status(201).location(`/api/register/${id}`).json({ id }).end();
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.post("/api/login", async (req, res, next) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  if (!user.email || !user.password) {
    return res.status(400).send({
      message: "Email or password missing.",
    });
  }
  const existUser = await repository.existUser(user);
  try {
    if (existUser) {
      //if user log in success, generate a JWT token for the user with a secret key
      jwt.sign({ user }, "privatekey", { expiresIn: "1h" }, (err, token) => {
        if (err) {
          console.log(err);
        }
        res.status(200).send({ token }).end();
      });
    } else {
      console.log("ERROR: Could not log in");
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
});

//Check to make sure header is not undefined, if so, return Forbidden (403)
router.use(verifyToken);

router.get("/api/users", async (req, res) => {
  const clienteRequestId = req.user.id;
  const isAdm = await repository.isUserAdmin(clienteRequestId);
  console.log("req", req.user);
  try {
    if (isAdm) {
      const users = await repository.getUsers(req.user.id);
      res.status(200).json(users).end();
    } else {
      res.status(401).json("You dont have permission to see all users").end();
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/api/users/:userId", async (req, res) => {
  const clienteRequestId = req.user.id;
  const userId = req.params.userId;
  const isAdm = await repository.isUserAdmin(clienteRequestId);

  try {
    if (isAdm) {
      const user = await repository.getUser(userId);
      res.status(200).json(user).end();
    } else {
      const userSameLobby = await repository.getUserSameLobby(
        clienteRequestId,
        userId
      );
      res.status(200).json(userSameLobby).end();
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/api/lobby/:lobbyId/user", async (req, res) => {
  const lobbyId = req.params.lobbyId;
  console.log("res", req.body);
  try {
    const userLobyId = await repository.addUserIntoLobby(lobbyId, req.body);
    res.status(201).json({ userLobyId }).end();
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.delete("/api/lobby/:lobbyId/user/:userId", async (req, res) => {
  const lobbyId = req.params.lobbyId;
  const userId = req.params.userId;
  console.log({ lobbyId }, { userId });
  try {
    await repository.removeUserFromLobby(lobbyId, userId);
    res.status(201).json(`User id:${userId} was deleted`).end();
  } catch (error) {
    res.status(400).json(error.message);
  }
});

export default router;
