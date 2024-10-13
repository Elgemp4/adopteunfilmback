import { matchedData, validationResult } from "express-validator";
import { getProviders } from "../services/fetcher/providersFetcher.js";
import { RequestHandler } from "express";
import {getUserProviders, saveIfNoExistsProvider, saveUserProviders} from "../services/orm/providerORM.js";

export const getAllProviders :RequestHandler = async (req, res) => {
    const {region, language} = matchedData(req);

    const result = await getProviders(language, region);

    saveIfNoExistsProvider(result);

    res.json(result);
}

export const getUserPersonalProviders : RequestHandler = async (req, res) => {
    try {
        const user = req.body.user;

        const userWithProviders = await getUserProviders(user.id);

        if (!userWithProviders) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.json({ providers: userWithProviders.providers });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const addUserProviders : RequestHandler = async (req, res) => {
    const user = req.body.user;
    const providerIds = req.body.providers;

    try {
        const userWithProviders = await saveUserProviders(user, providerIds);

        res.json({ providers: userWithProviders.providers });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
