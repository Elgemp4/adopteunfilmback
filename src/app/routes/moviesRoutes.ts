import { Router } from "express";
import { body } from "express-validator";
import { index } from "../controllers/moviesController.js";

const movieRouter = Router();

movieRouter.get("/",
    body("watch_providers").isString().escape(),
    body("page").isNumeric().escape(),
    index
);

export default movieRouter;