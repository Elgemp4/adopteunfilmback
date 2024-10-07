import { Router } from "express";
import { body } from "express-validator";
import { index } from "../controllers/providersController.js";

const providerRouter = Router();


providerRouter.get("/",
    body('language').isString().escape(),
    body('region').isString().escape(), 
    index
)

export default providerRouter;