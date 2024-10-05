import axios from "axios";

import 'dotenv/config'

const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_TOKEN}` 
    }
  };


export default class MovieController {
    public async index(req, res){

      const result = await axios.request(options);
      res.json(result.data);
    }
}