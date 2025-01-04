import {RequestHandler} from "express";
import {
    getGroupOfUser,
    createGroup,
    joinGroup,
    getUserInGroup
} from "../services/store/groupStore.js";
import {User} from "../entity/User.js";
import {Group} from "../entity/Group.js";
import { getBestRatedMoviesBy } from "../services/store/movieStore.js";

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

export const getGroupSuggestions: RequestHandler = async (req, res) => {
    try {
        const groupId = Number.parseInt(req.params.id);
        const groupUsers = await getUserInGroup(groupId);
        const suggestions = await getBestRatedMoviesBy(groupUsers)
        res.json({ suggestions: suggestions });
    } catch (error) {
        res.status(500).json(error);
    }
}