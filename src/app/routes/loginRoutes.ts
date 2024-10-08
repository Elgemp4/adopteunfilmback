import { Router } from "express";
import { body } from "express-validator";
import { index } from "../controllers/providersController.js";
import { login } from "../controllers/loginController.js";
import forceValidation from "../middleware/validate.js";
import validate from "../middleware/validate.js";

const loginRouter = Router();

loginRouter.get("/", 
    validate([
        body("email").isEmail().escape(),
        body("password").isString().escape(),
    ]),
    login
)

export default loginRouter;