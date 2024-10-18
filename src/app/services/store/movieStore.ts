import { EntityManager } from "typeorm";
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


export async function getMovie(movieId, entityManager : EntityManager = AppDataSource.manager){
    const movieRepo = entityManager.getRepository(Movie);

    return await movieRepo.findOne({
        where: {
            id: movieId
        },
        lock:{mode: "pessimistic_write"} 
    })
}

export async function saveMovieIfNotExists(rawMovie){
    return await AppDataSource.transaction("SERIALIZABLE", async (transaction ) => {
        const movieRepo = transaction.getRepository(Movie);
        const existingMovie = await getMovie(rawMovie.id, transaction)
        if(existingMovie != undefined)
        {
            return existingMovie;
        }

        const movie = await createMovieFromRaw(rawMovie, transaction);

        console.log("finiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        await movieRepo.save(movie);
        console.log("biitteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
        return movie;
    })
    
}

async function createMovieFromRaw(rawMovie, entityManager : EntityManager = AppDataSource.manager){
    const genreRepo = entityManager.getRepository(Genre);
    const movieRepo = entityManager.getRepository(Movie);

    const movie = movieRepo.create({
        id: rawMovie.id,
        adult: rawMovie.adult,
        title: rawMovie.title,
        description: rawMovie.overview,
        poster_path: rawMovie.poster_path
        ,vote_avg: rawMovie.vote_average
    });

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