import { Router } from "express";
import { body } from "express-validator";
import { suggestMoviesController } from "../controllers/moviesController.js";
import validate from "../middleware/validate.js";
import authenticate from "../middleware/authenticate.js";

const movieRouter = Router();

movieRouter.get("/",
    authenticate,
    validate([
        body("page").isNumeric().escape(),
    ]),
    suggestMoviesController
);

export default movieRouter;