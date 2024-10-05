import { matchedData, validationResult } from "express-validator";
import { getProviders } from "../services/fetcher/providersFetcher.js";

export default class ProviderController {
    public async index(req, res){
        const errorResult = validationResult(req);
        if(!errorResult.isEmpty()){
            res.json({message: "Bad request"}, 400);
            return;
        }

        const {region, language} = matchedData(req);

        const result = await getProviders(language, region);
        res.json(result);
    }
}