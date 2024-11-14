import { Router } from "express";
import { body } from "express-validator";
import { checkTokenController, login, register, renewToken } from "../controllers/authentificationController.js";
import validate from "../middleware/validate.js";
import authenticate from "../middleware/authenticate.js";

const authentificationRouter = Router();

authentificationRouter.post("/login", 
    validate([
        body("email").isEmail().escape(),
        body("password").escape(),
    ]),
    login
)

authentificationRouter.post("/register",
    validate([
        body("email").isEmail().escape(),
        body("password").escape(),
        body("firstname").isString().escape(),
        body("lastname").isString().escape(),
        body("birthdate").isDate().escape()
    ]),
    register
)

authentificationRouter.post("/token",
    authenticate,
    checkTokenController
)           

authentificationRouter.post("/renew", validate([
    body("token").isString(),
    body("refreshToken").isString(),
]), renewToken);

export default authentificationRouter;