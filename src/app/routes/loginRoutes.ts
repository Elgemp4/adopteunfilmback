import { Router } from "express";
import { body } from "express-validator";
import { index } from "../controllers/providersController.js";
import { login } from "../controllers/loginController.js";

const loginRouter = Router();

loginRouter.get("/",
    body("email").isEmail().escape(),
    body("password").isString().escape(),
    login
)

export default loginRouter;