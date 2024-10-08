import { matchedData, validationResult } from "express-validator";
import { getProviders } from "../services/fetcher/providersFetcher.js";
import { RequestHandler } from "express";

export const index :RequestHandler = async (req, res) => {
    const {region, language} = matchedData(req);

    const result = await getProviders(language, region);
    res.json(result);
}
