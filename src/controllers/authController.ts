import { Request, Response } from "express";
import { signJwt } from "../utils/jwt";
import {LoginInput} from "../schemas/authSchema";
import { validatePassword} from "../services/authServices";
import config from "config";
import { getUserByEmail, getUserById } from "../services/userServices";
import log from "../utils/logger"


export async function loginHandler(req: Request<{}, {}, LoginInput["body"]>, res: Response) {
  try {
  // Validate the email and password
  const user = await validatePassword(req.body);
  const message = "Invalid email or password";

  if (!user) {
    return res.status(401).send(message);
  }

  // create an access token
  const accessToken = signJwt({ userID: user.userID }, "accessTokenPrivateKey", {
    expiresIn: config.get("accessTokenTtl")
  });

  // create a refresh token
  const refreshToken = signJwt({ userID: user.userID}, "refreshTokenPrivateKey",{ 
      expiresIn: config.get("refreshTokenTtl") 
  });

  // return access & refresh tokens
  return res.status(200).json({ message: "Login successful", accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Failed to login" });
  }
}