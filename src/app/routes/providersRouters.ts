import { Router } from "express";
import { body } from "express-validator";
import {addUserProviders, getAllProviders, getUserProviders} from "../controllers/providersController.js";
import forceValidation from "../middleware/validate.js";
import validate from "../middleware/validate.js";
import authenticate from "../middleware/authenticate.js";

const providerRouter = Router();


providerRouter.get("/global", 
    validate([
        body('language').isString().escape(),
        body('region').isString().escape(), 
    ]),
    getAllProviders
)

providerRouter.get("/personal",
    authenticate,
    getUserProviders
)

providerRouter.post("/personal",
    authenticate,
    validate([
        body('providerId').isInt().escape(),
    ]),
    addUserProviders
);

export default providerRouter;