import 'dotenv/config'
import { getMovies } from "../services/fetcher/moviesFetcher.js";
import { matchedData, validationResult } from 'express-validator';
import { RequestHandler } from 'express';

export const index : RequestHandler = async (req, res) => {
      const errorResult = validationResult(req);
      if(!errorResult.isEmpty()){
        res.json({message: "Bad request"});
        return;
      }

      const {watch_providers, page} = matchedData(req);

      const result = await getMovies(page, watch_providers);
      res.json(result);
    }