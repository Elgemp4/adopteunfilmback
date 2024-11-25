import {RequestHandler} from "express";
import {
    getUserGroups,
    createGroup,
    joinGroup,
    getUsersFromGroup, getGroupCode
} from "../services/store/groupStore.js";
import {User} from "../entity/User.js";
import {Group} from "../entity/Group.js";

export const getUserPersonalGroups : RequestHandler = async (req, res) => {
    const user = req.body.user;

    try {
        const groups = await getUserGroups(user.id);

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

export const getGroupUsersHandler: RequestHandler = async (req, res) => {
    const { groupId } = req.params;

    try {
        const users = await getUsersFromGroup(parseInt(groupId));
        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getGroupCodeHandler: RequestHandler = async (req, res) => {
    const { groupId } = req.params;

    try {
        const { code } = await getGroupCode(parseInt(groupId));
        res.json({ code });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}