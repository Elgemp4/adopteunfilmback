import {RequestHandler} from "express";
import {
    getGroupOfUser,
    createGroup,
    joinGroup,
    getUserInGroup
} from "../services/store/groupStore.js";
import {User} from "../entity/User.js";
import {Group} from "../entity/Group.js";
import { getBestRatedMoviesBy, getMovieWithoutTransaction, getUserWhoLiked as getUsersWhoLiked } from "../services/store/movieStore.js";

export const getUserPersonalGroups : RequestHandler = async (req, res) => {
    const user = req.body.user;

    try {
        const groups = await getGroupOfUser(user.id);

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

const isArrayOfStrings = (value: any): value is string[] =>
    Array.isArray(value) && value.every((item) => typeof item === 'string');

export const getGroupSuggestions: RequestHandler = async (req, res) => {
    try {
        if(!isArrayOfStrings(req.query.u)){
            res.status(400).json({message: "Invalid query parameter"});
            return;
        }
        if(typeof req.query.start !== "string" ){
            res.status(400).json({message: "Invalid query parameter"});
            return
        }

        const selectedUsersId = req.query.u.map((id: string) => parseInt(id));
        const suggestions = [];
        const rawSuggestions = await getBestRatedMoviesBy(selectedUsersId, parseInt(req.query.start));
        for(const suggestion of rawSuggestions){
            const users = await getUsersWhoLiked(suggestion.movieId, selectedUsersId);
            const movie = await getMovieWithoutTransaction(suggestion.movieId);
            suggestions.push({
                movie,
                users
            });
        }
        res.json(suggestions);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}