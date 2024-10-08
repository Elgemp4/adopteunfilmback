import { Router } from "express";
import { body } from "express-validator";
import { index } from "../controllers/providersController.js";
import forceValidation from "../middleware/validate.js";
import validate from "../middleware/validate.js";

const providerRouter = Router();


providerRouter.get("/", 
    validate([
        body('language').isString().escape(),
        body('region').isString().escape(), 
    ]),
    index
)

export default providerRouter;