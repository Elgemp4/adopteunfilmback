import { matchedData, validationResult } from "express-validator";
import { getProviders } from "../services/fetcher/providersFetcher.js";
import { RequestHandler } from "express";
import {getUserWithProviders, saveIfNoExistsProvider} from "../services/orm/providerORM.js";

export const getAllProviders :RequestHandler = async (req, res) => {
    const {region, language} = matchedData(req);

    const result = await getProviders(language, region);

    saveIfNoExistsProvider(result);

    
    res.json(result);
}

// @ts-ignore
export const getUserProviders : RequestHandler = async (req, res) => {
    try {
        const user = req.body.user;

        const userWithProviders = await getUserWithProviders(user.id);

        if (!userWithProviders) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ providers: userWithProviders.providers });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
