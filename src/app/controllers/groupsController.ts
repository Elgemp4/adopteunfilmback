import {RequestHandler} from "express";
import {getUserGroups, createGroup} from "../services/store/groupStore.js";
import {User} from "../entity/User.js";
import {Group} from "../entity/Group";

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