import { Router } from "express";
import MovieController from "../controllers/movies.js";

const movieController = new MovieController();
const movieRouter = Router();

movieRouter.get("/", movieController.index);


export default movieRouter;