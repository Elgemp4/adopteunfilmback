import { Router } from "express";
import { body } from "express-validator";
import { getProviders } from "../services/fetcher/providersFetcher.js";
import ProviderController from "../controllers/providersController.js";

const providerRouter = Router();
const providerController = new ProviderController();

providerRouter.get("/",
    body('language').isString().escape(),
    body('region').isString().escape(), 
    providerController.index
)

export default providerRouter;