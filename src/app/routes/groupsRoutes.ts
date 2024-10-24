import {Router} from "express";
import authenticate from "../middleware/authenticate.js";

const groupRouter = Router();

groupRouter.get("/",
    authenticate,
)

export default groupRouter;