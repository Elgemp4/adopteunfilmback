import { EntityManager } from "typeorm";
import AppDataSource from "../../data-source.js";
import Genre from "../../entity/Genre.js";
import Movie from "../../entity/Movie.js";
import MovieReview from "../../entity/MovieReview.js";
import { raw } from "express";
import { User } from "../../entity/User.js";
import app from "../../app.js";

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
        relations: ["genres"],
        lock:{mode: "pessimistic_write"} 
    })
}

async function saveMovieIfNotExists(rawMovie, entityManager : EntityManager){
    
    const movieRepo = entityManager.getRepository(Movie);
    const existingMovie = await getMovie(rawMovie.id, entityManager)

    if(existingMovie != undefined)
    {
        return existingMovie;
    }

    const movie = await createMovieFromRaw(rawMovie, entityManager);

    await movieRepo.save(movie);
    return movie;
}

export async function saveMoviesIfNotExists(rawMovies){
    return await AppDataSource.transaction("READ COMMITTED", async (transaction ) => {
        const movies = new Array<Movie>();

        for(const rawMovie of rawMovies){
            movies.push(await saveMovieIfNotExists(rawMovie, transaction));
        }

        return movies;
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
        release_date: rawMovie.release_date,
        poster_path: rawMovie.poster_path,
        vote_avg: rawMovie.vote_average,
        vote_count: rawMovie.vote_count
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
    
    review.appreciate = JSON.parse(appreciate);
    review.seen = seen == JSON.parse(appreciate);
    movieReviewRepo.save(review);
}

export async function getBestRatedMoviesBy(usersId : number[]){
    const movieReviewRepo = AppDataSource.getRepository(MovieReview);
    const movies = await movieReviewRepo.createQueryBuilder("review")
        .select("review.movieId")
        .addSelect("AVG(review.appreciate)", "avg")
        .where("review.userId IN (:...users)", {users: usersId})
        .groupBy("review.movieId")
        .orderBy("avg", "DESC")
        .limit(10)
        .getRawMany();

    console.log(movies);

    return movies;
}