import { getUserByEmail, comparePasswords, getUserById } from "./userServices";
import config from "config";
import { signJwt, verifyJwt } from "../utils/jwt";
import { pool } from "../utils/connectToDb";
import { v4 as uuidv4 } from "uuid";
import argon2 from "argon2";

// Function to check wheter the email and password matches
export async function validatePassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = await getUserByEmail(email);
  
    if (!user) return false;
  
    const isValid = await comparePasswords(user.password, password);
  
    if (!isValid) return false;
  
    // Return the lawyer object without the password field
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

export async function reIssueAccessToken({ refreshToken }: { refreshToken: string }): Promise<string | null> {
    try {
      // Verify the refresh token and get the decoded data
      const { decoded } = verifyJwt(refreshToken, "refreshTokenPublicKey");
  
      // Check if the refresh token is valid and contains necessary data
      if (!decoded || !decoded.userID) {
        return null;
      }
  
      const user = await getUserById(decoded.userID);
      if (!user) {
        return null;
      }
  
      // Reissue the access token
      const accessToken = signJwt(
        { userID: user.userID },
        "accessTokenPrivateKey",
        { expiresIn: config.get("accessTokenTtl") }
      );
  
      return accessToken;
    } catch (error) {
      console.error('Error reissuing access token:', error);
      return null;
    }
  }