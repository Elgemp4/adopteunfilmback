import 'dotenv/config'
import { suggestMovies } from "../services/fetcher/moviesFetcher.js";
import { matchedData, validationResult } from 'express-validator';
import { RequestHandler } from 'express';
import { User } from '../entity/User.js';
import AppDataSource from '../data-source.js';

export const suggestMoviesController : RequestHandler = async (req, res) => {
      const {page} = matchedData(req);

      const userRepo = AppDataSource.getRepository(User);

      const userId = req.body.user.id;

      const user = await userRepo.findOne({
        where: {
          id: userId
        },
        relations: ["providers"]
      })

      const providers = user.providers.map((provider) => provider.provider_id);

      const result = await suggestMovies(page, providers);
      res.json(result);
    }