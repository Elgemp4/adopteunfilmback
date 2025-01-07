import { EntityManager, In } from "typeorm";
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

export async function getMovieWithoutTransaction(movieId){
    const movieRepo = AppDataSource.getRepository(Movie);

    return await movieRepo.findOne({
        where: {
            id: movieId
        },
        relations: ["genres"]
    })
}

export async function getMovie(movieId, entityManager : EntityManager){
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

    console.log(rawMovie);
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
    review.seen = JSON.parse(appreciate);
    movieReviewRepo.save(review);
}

export async function getBestRatedMoviesBy(usersId : number[], start = 0){
    const movieReviewRepo = AppDataSource.getRepository(MovieReview);
    try{
        const movies = await movieReviewRepo.createQueryBuilder("review")
            .select("review.movieId", "movieId")
            .addSelect("SUM(review.appreciate)", "appreciateCount")
            .leftJoin("review.movie", "movie")
            .addSelect("movie.vote_avg", "vote_avg")
            .where("review.userId IN (:...users)", {users: usersId})
            .groupBy("review.movieId")
            .having("SUM(review.seen) < :usersCount", {usersCount: usersId.length})
            .orderBy({
                "appreciateCount": "DESC",
                "movie.vote_avg": "DESC",
            })
            .offset(start)
            .limit(10)
            .getRawMany();
        return movies;
    }
    catch(error){
        console.log(error);
        return [];
    }
}

export async function getUserWhoLiked(movieId: number, usersId: number[]){
    const movieReviewRepo = AppDataSource.getRepository(MovieReview);

    const reviews = await movieReviewRepo.find({
        select: ["user"],
        where: {
            movieId: movieId,
            userId: In(usersId), 
            appreciate: true, 
        },
        relations: ["user"]
    });

    return reviews.map(review => review.user);
}