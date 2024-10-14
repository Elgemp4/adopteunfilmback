import 'dotenv/config'
import { suggestMovies } from "../services/provider/moviesProvider.js";
import { matchedData } from 'express-validator';
import { RequestHandler } from 'express';
import { getUserProviders } from '../services/store/providerStore.js';
import { evaluateMovie } from '../services/store/movieStore.js';

export const suggestMoviesController : RequestHandler = async (req, res) => {
  const userId = req.body.user.id;

  const providerIds : number[] = (await getUserProviders(userId)).map((provider) => provider.provider_id);

  const result = await suggestMovies(userId, providerIds);
  res.json(result);
}

export const evaluateMovieController : RequestHandler = async (req, res) => {
  const { movieId, appreciate, seen } = matchedData(req);
  
  const userId = req.body.user.id;

  await evaluateMovie(userId, movieId, appreciate, seen);

  res.status(200).send();
}