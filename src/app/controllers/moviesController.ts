import 'dotenv/config'
import { suggestMovies } from "../services/provider/moviesProvider.js";
import { matchedData } from 'express-validator';
import { RequestHandler } from 'express';
import { getUserProviders } from '../services/store/providerStore.js';
import { evaluateMovie, saveMoviesIfNotExists } from '../services/store/movieStore.js';

export const suggestMoviesController : RequestHandler = async (req, res) => {
  const userId = req.body.user.id;

  try{
    const providerIds : number[] = (await getUserProviders(userId)).map((provider) => provider.provider_id);
    const unsavedMovies = await suggestMovies(userId, providerIds);

    const savedMovies = await saveMoviesIfNotExists(unsavedMovies);
    
    for(const movie of savedMovies){
      movie.poster_path = `${process.env.POSTER_URL}${movie.poster_path}`
    }
    res.json(savedMovies);
  } 
  catch(error){
    console.log(error)
    res.status(500).json(error);
  }
}

export const evaluateMovieController : RequestHandler = async (req, res) => {
  const { movieId, appreciate, seen } = matchedData(req);
  
  const userId = req.body.user.id;

  try{
    await evaluateMovie(userId, movieId, appreciate, seen);

    res.status(200).send();
  }
  catch(error){
    res.status(500).json({message: error})
  }
  
}