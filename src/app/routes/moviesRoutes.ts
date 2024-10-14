import { Router } from "express";
import { body } from "express-validator";
import { evaluateMovieController, suggestMoviesController } from "../controllers/moviesController.js";
import validate from "../middleware/validate.js";
import authenticate from "../middleware/authenticate.js";

const movieRouter = Router();

movieRouter.get("/",
    authenticate,
    suggestMoviesController
);

movieRouter.post("/",
    authenticate,
    validate([
        body("movieId").isInt().escape(),
        body("appreciate").isBoolean().escape(),
        body("seen").isBoolean().escape(),
    ]),
    evaluateMovieController
)

export default movieRouter;