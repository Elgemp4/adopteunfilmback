import 'dotenv/config'
import { suggestMovies } from "../services/fetcher/moviesFetcher.js";
import { matchedData, validationResult } from 'express-validator';
import { RequestHandler } from 'express';
import { User } from '../entity/User.js';
import AppDataSource from '../data-source.js';
import { getUserProviders } from '../services/orm/providerORM.js';

export const suggestMoviesController : RequestHandler = async (req, res) => {
      const {page} = matchedData(req);

      const userRepo = AppDataSource.getRepository(User);

      const userId = req.body.user.id;

      const providerIds : number[] = (await getUserProviders(userId)).map((provider) => provider.provider_id);

      const result = await suggestMovies(userId, providerIds);
      res.json(result);
    }