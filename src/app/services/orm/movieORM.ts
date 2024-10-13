import AppDataSource from "../../data-source.js";
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