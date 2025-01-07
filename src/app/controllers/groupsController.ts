import {RequestHandler} from "express";
import {
    getGroupsOfUser,
    createGroup,
    joinGroup,
} from "../services/store/groupStore.js";
import {User} from "../entity/User.js";
import {Group} from "../entity/Group.js";
import { evaluateMovie, getBestRatedMoviesBy, getMovieWithoutTransaction, getUserReview, getUserWhoLiked as getUsersWhoLiked } from "../services/store/movieStore.js";
import "dotenv/config";


export const getUserPersonalGroups : RequestHandler = async (req, res) => {
    const user = req.body.user;

    try {
        const groups = await getGroupsOfUser(user.id);

        res.json({ groups });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const createGroupHandler: RequestHandler = async (req, res) => {
    const { name } = req.body;
    const user: User = req.body.user;

    try {
        const group = await createGroup({ name } as Group, user);
        res.json({ group });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const joinGroupHandler: RequestHandler = async (req, res) => {
    const { code } = req.body;
    const user: User = req.body.user;

    try {
        const group = await joinGroup(code, user);
        res.json({ group });
    } catch (error) {
        res.status(500).json(error);
    }
}


export const getGroupSuggestions: RequestHandler = async (req, res) => {
    try {
        const selectedUsersId = req.body["selectedUsersId"];
        const suggestions = []; 
        const rawSuggestions = await getBestRatedMoviesBy(selectedUsersId, parseInt(req.params.start));
        for(const suggestion of rawSuggestions){
            const users = await getUsersWhoLiked(suggestion.movieId, selectedUsersId);
            const movie = await getMovieWithoutTransaction(suggestion.movieId);
            movie.poster_path = `${process.env.POSTER_URL}${movie.poster_path}`;

            suggestions.push({
                movie,
                users
            });
        }
        res.json(suggestions);
    } catch (error) {
        res.status(500).json(error);
    }
}


export const setMovieSeenByGroup: RequestHandler = async (req, res) => {
    const user = req.body.user;
    let selectedUsersId = req.body["selectedUsersId"];

    try {
        const groupId = parseInt(req.params.id);
        const movieId = parseInt(req.params.movieId);

        for(const userId of selectedUsersId){
            const review = await getUserReview(userId, movieId);
            evaluateMovie(userId, movieId, review?.appreciate, true);
        }

        res.status(200).send();
    }catch(error){
        res.status(500).json({message: error.message});
    }
};