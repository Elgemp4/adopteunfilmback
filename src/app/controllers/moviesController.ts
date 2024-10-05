import 'dotenv/config'
import { getMovies } from "../services/fetcher/moviesFetcher.js";
import { matchedData, validationResult } from 'express-validator';

export default class MovieController {
    public async index(req, res){
      const errorResult = validationResult(req);
      if(!errorResult.isEmpty()){
        res.json({message: "Bad request"}, 400);
        return;
      }

      const {watch_providers, page} = matchedData(req);

      const result = await getMovies(page, watch_providers);
      res.json(result);
    }
}