import AppDataSource from "../../data-source.js";
import Genre from "../../entity/Genre.js";
import Movie from "../../entity/Movie.js";
import MovieReview from "../../entity/MovieReview.js";

export async function getUserReview(userId, movieId){
    const movieReviewRepo = AppDataSource.getRepository(MovieReview);

    const review = await movieReviewRepo.findOne({
        where: {
            userId,
            movieId
        }
    })

    return review;
}

export async function getMovie(movieId){
    const movieRepo = AppDataSource.getRepository(Movie);

    return await movieRepo.findOne({
        where: {
            id: movieId
        }
    })
}

export async function saveMovieIfNotExists(rawMovie){
    const movieRepo = AppDataSource.getRepository(Movie);

    const existingMovie = await getMovie(rawMovie.id)
    if(existingMovie != undefined)
    {
        return existingMovie;
    }

    const movie = await createMovieFromRaw(rawMovie);

    movieRepo.save(movie);

    return movie;
}

async function createMovieFromRaw(rawMovie){
    const genreRepo = AppDataSource.getRepository(Genre);

    const movie = new Movie();
    movie.id = rawMovie.id;
    movie.adult = rawMovie.adult;
    movie.title = rawMovie.title;
    movie.description = rawMovie.overview;
    movie.poster_path = rawMovie.poster_path;
    movie.vote_avg = rawMovie.vote_average;

    movie.genres = [];
    for(const genreId of rawMovie.genre_ids){
        const genre = await genreRepo.findOneBy({id: genreId});
        movie.genres.push(genre);
    }

    return movie;
}

export async function evaluateMovie(userId, movieId, appreciate, seen){
    const movieReviewRepo = AppDataSource.getRepository(MovieReview);
    
    let review = await getUserReview(userId, movieId);
    if(review == undefined){
        review = new MovieReview();
        review.userId = userId;
        review.movieId = movieId;
    }
    
    review.appreciate = appreciate == 'true'; //MEH je suis pas convaincu de ça faut que je recherche un alternative
    review.seen = seen == 'true';
    movieReviewRepo.save(review);
}