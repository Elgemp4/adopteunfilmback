import axios from "axios";

const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTZiMzliYzUzYmQwOWNiZmY5Zjk4NzA4YmEwMTU4NSIsIm5iZiI6MTcyODA1MTA4Ni4yMDQ1NDgsInN1YiI6IjY2MGU5ZTg4ZTE4ZTNmMDE3ZGE0MTgzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Qsa89J9nO-5uYigZFKrvlN9lDrkctply5rpiyqLrZZ0'
    }
  };


export default class MovieController {
    public async index(req, res){

      const result = await axios.request(options);
      res.json(result.data);
    }
}