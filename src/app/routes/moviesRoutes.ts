import { Router } from "express";
import { body } from "express-validator";
import { index } from "../controllers/moviesController.js";
import forceValidation from "../middleware/validate.js";
import validate from "../middleware/validate.js";

const movieRouter = Router();

movieRouter.get("/",
    validate([
        body("watch_providers").isString().escape(),
        body("page").isNumeric().escape(),
    ]),
    index
);

export default movieRouter;