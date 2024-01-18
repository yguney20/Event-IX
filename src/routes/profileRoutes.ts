import express from "express";
import requireUser from "../middlewares/requireUser";
import { updateUserProfileSchema } from "../schemas/userSchema";
import validateResource from "../middlewares/validateResource";

import { 
    getUserTicketsHandler, 
    getUserEmergencyContactHandler, 
    getUserUpcomingBookingsHandler, 
    getUserPastBookingsHandler, 
    getUserFavoriteEventTypeHandler,
    updateUserProfileHandler
} from "../controllers/profileController";

const profileRouter = express.Router();

profileRouter.get('/api/user/tickets', requireUser, getUserTicketsHandler);
profileRouter.get('/api/user/emergency-contact', requireUser, getUserEmergencyContactHandler);
profileRouter.get('/api/user/upcoming-bookings', requireUser, getUserUpcomingBookingsHandler);
profileRouter.get('/api/user/past-bookings', requireUser, getUserPastBookingsHandler);
profileRouter.get('/api/user/fav-event-type', requireUser, getUserFavoriteEventTypeHandler);
//to update the user profile
profileRouter.put('/api/user/profile/:userID', requireUser, validateResource(updateUserProfileSchema), updateUserProfileHandler);

export default profileRouter;
