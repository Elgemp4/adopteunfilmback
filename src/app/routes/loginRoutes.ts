import { Router } from "express";
import { body } from "express-validator";
import { index } from "../controllers/providersController.js";
import { login } from "../controllers/loginController.js";

const loginRouter = Router();

loginRouter.get("/",
    login
)

export default loginRouter;