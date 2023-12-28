import express from "express";
import validateResource from "../middlewares/validateResource";
import { createUserHandler, getUserProfileByIdHandler} from "../controllers/userController";
import { createUserSchema, getUserProfileSchema } from "../schemas/userSchema";
import requireUser from "../middlewares/requireUser";

const userRouter = express.Router();

// Route for creating a new user
userRouter.post('/api/register', validateResource(createUserSchema), createUserHandler);

// Route for getting a user profile by ID
userRouter.get('/api/user/profile/:userID',validateResource(getUserProfileSchema), requireUser, getUserProfileByIdHandler);

export default userRouter;
