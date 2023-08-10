import jwt from "jsonwebtoken";
import repository from "../repositories/userRepository.js";

export const verifyToken = (req, res, next) => {
  const authorization = req.headers["authorization"];
  console.log(authorization);

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, "privatekey", async (err, authorizedData) => {
    if (err) {
      res.sendStatus(401); //Unautohorized
    } else {
      req.user = await repository.getUserByEmail(authorizedData.user.email);
      next();
    }
  });
};
