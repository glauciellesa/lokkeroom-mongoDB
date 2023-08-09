import express from "express";
import repository from "../repositories/userRepository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { verifyToken } from "../services/authService.js";
import validator from "../validators/validator.js";

const router = express.Router();

/* router.get("/", async (req, res) => {
  res.send("hello world");
}); */

router.post("/api/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password)
    return res.status(400).json({ message: " User data are required" });

  const duplicate = await repository.checkeIfEmailExist(email);
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
    };
    const id = await repository.registerUser(newUser);
    res.status(201).json({ id }).end();
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

  const isValidEmail = validator.validateEmail(user.email);
  if (!isValidEmail) {
    return res.status(403).send({
      //forbidden
      message: "Email not valid.",
    });
  }

  const existUser = await repository.existUser(user);
  try {
    if (!existUser) {
      res.status(401).json({ ERROR: "Email or password did not exist." }); //Unautorized
    } else {
      //if user log in success, generate a JWT token for the user with a secret key
      jwt.sign({ user }, "privatekey", { expiresIn: "1h" }, (err, token) => {
        if (err) {
          console.log(err);
        }
        res.status(200).send({ token }).end();
      });
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
});

//Check to make sure header is not undefined, if so, return Forbidden (403)
router.use(verifyToken);

router.get("/api/users", async (req, res) => {
  const clienteRequestId = req.user.id;
  const isAdm = await repository.isUserCoachInLobby(clienteRequestId);
  console.log({ isAdm });
  try {
    if (isAdm) {
      const users = await repository.getUsers(req.user.id);
      res.status(200).json(users).end();
    } else {
      res.status(401).end();
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/api/lobby/:loobyId/users/:userId", async (req, res) => {
  const loobyId = req.params.loobyId;
  const clienteRequestId = req.user.id;
  const userId = req.params.userId;

  const isClientAcoach = await repository.isUserCoachInLobby(
    clienteRequestId,
    loobyId
  );
  console.log({ isClientAcoach });

  try {
    if (isClientAcoach) {
      const user = await repository.getUser(userId);
      res.status(200).json(user).end();
    } else {
      const userSameLobby = await repository.getUserSameLobby(
        clienteRequestId,
        userId,
        loobyId
      );
      res.status(200).json(userSameLobby).end();
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/api/lobby/:lobbyId/users", async (req, res) => {
  const lobbyId = req.params.lobbyId;
  const userId = req.body.users[0].user_id;
  try {
    const userLobyId = await repository.addUserIntoLobby(lobbyId, userId);
    res.status(201).json({ userLobyId }).end();
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.delete("/api/lobby/:lobbyId/users/:userId", async (req, res) => {
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
