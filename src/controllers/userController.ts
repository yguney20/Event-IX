import { Request, Response } from 'express';
import { createUser, getUserById} from '../services/userServices';
import { CreateUserInput, GetUserProfileInput} from '../schemas/userSchema';
import { omit } from 'lodash';

// Controller function to create a new user
export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {
  try {

    const user = await createUser(req);

    if (!user) {
      return res.status(500).json({ error: 'Failed to create user' });
    }

    return res.status(200).json(omit(user, ["password"]));
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to create user', message: error.message });
  }
}

// Controller func to get a user's profile by id
export async function getUserProfileByIdHandler( req: Request<GetUserProfileInput["params"]>, res: Response ) {
  const userID = Number(req.params.userID);
  
  if (isNaN(userID)) {
    return res.status(400).send("Invalid userID");
  }
  try {
    const user = await getUserById(userID);

    if (!user) {
      return res.status(404).send("No users found with the specified id");
    }

    return res.status(200).json(omit(user, ["password"]));
  } catch (error) {
    console.error("Error getting user:", error);
    return res.status(500).json({ error: "Failed to get user" });
  }
}