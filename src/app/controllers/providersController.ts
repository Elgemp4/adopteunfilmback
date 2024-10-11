import { matchedData, validationResult } from "express-validator";
import { getProviders } from "../services/fetcher/providersFetcher.js";
import { RequestHandler } from "express";
import { saveIfNoExistsProvider } from "../services/orm/providerORM.js";

export const getAllProviders :RequestHandler = async (req, res) => {
    const {region, language} = matchedData(req);

    const result = await getProviders(language, region);

    saveIfNoExistsProvider(result);

    
    res.json(result);
}

export const getUserProviders : RequestHandler = async (req, res) => {
    const user = req.body.user;

    //TODO

    res.json({user});
}
