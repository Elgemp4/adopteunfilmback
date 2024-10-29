import {Router} from "express";
import authenticate from "../middleware/authenticate.js";
import {getUserPersonalGroups} from "../controllers/groupsController.js";

const groupRouter = Router();

groupRouter.get("/",
    authenticate,
    getUserPersonalGroups
)

export default groupRouter;