import { Router } from "express";
import { body } from "express-validator";
import {addUserProviders, getAllProviders, getUserPersonalProviders} from "../controllers/providersController.js";
import forceValidation from "../middleware/validate.js";
import validate from "../middleware/validate.js";
import authenticate from "../middleware/authenticate.js";

const providerRouter = Router();

providerRouter.get("/",
    getAllProviders
)

providerRouter.get("/global", 
    validate([
        body('language').isString().escape(),
        body('region').isString().escape(), 
    ]),
    getAllProviders
)

providerRouter.get("/personal",
    authenticate,
    getUserPersonalProviders
)

providerRouter.post("/personal",
    authenticate,
    validate([
        body('providers')
        .isArray({min: 1})
        .custom((ids : Array<any>) => {
            ids.forEach((value) => {
                if(!Number.isInteger(value))
                { 
                    throw new Error("providerId should be an array of int")
                }
            });

            return true
        }).escape(),    
    ]),
    addUserProviders
);

export default providerRouter;