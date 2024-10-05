import { Router } from "express";
import MovieController from "../controllers/moviesController.js";
import { body } from "express-validator";

const movieController = new MovieController();
const movieRouter = Router();

movieRouter.get("/",
    body("watch_providers").isString().escape(),
    body("page").isNumeric().escape(),
    movieController.index);


export default movieRouter;