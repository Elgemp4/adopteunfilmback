import { Router } from "express";
import validate from "../middleware/validate.js";
import { body } from "express-validator";
import authenticate from "../middleware/authenticate.js";
import { changeSettings } from "../controllers/settingController.js";


const settingsRouter = Router();

settingsRouter.post("/",
    validate([
        body("firstname").escape(),
        body("lastname").escape(),
        body("birthdate").isDate().escape()
    ]),
    authenticate,
    changeSettings
)


export default settingsRouter;