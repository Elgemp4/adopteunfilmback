import { Router } from "express";
import { body } from "express-validator";
import { index } from "../controllers/providersController.js";
import { login, register } from "../controllers/authentificationController.js";
import forceValidation from "../middleware/validate.js";
import validate from "../middleware/validate.js";

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

export default authentificationRouter;