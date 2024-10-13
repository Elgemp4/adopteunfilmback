import 'dotenv/config'
import { suggestMovies } from "../services/fetcher/moviesFetcher.js";
import { matchedData, validationResult } from 'express-validator';
import { RequestHandler } from 'express';

export const suggestMoviesController : RequestHandler = async (req, res) => {
      const {watch_providers, page} = matchedData(req);

      const result = await suggestMovies(page, watch_providers);
      res.json(result);
    }