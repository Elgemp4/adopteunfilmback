import { matchedData } from "express-validator";
import { getProviders } from "../services/provider/providersProvider.js";
import { RequestHandler } from "express";
import {getUserProviders, saveIfNoExistsProvider, saveUserProviders, getSavedProviders} from "../services/store/providerStore.js";
import { setIsFullyRegister } from "../services/store/userStore.js";

export const getAllProviders :RequestHandler = async (req, res) => {
    const {region, language} = matchedData(req);

    const result = await getProviders(language, region);
    console.log(result);

    saveIfNoExistsProvider(result);

    res.json(result);
}

export const getUserPersonalProviders : RequestHandler = async (req, res) => {
    try {
        const user = req.body.user;

        const providers = await getUserProviders(user.id);

        if (!providers) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.json({ providers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addUserProviders : RequestHandler = async (req, res) => {
    const user = req.body.user;
    const providerIds = req.body.providers;

    try {
        const userWithProviders = await saveUserProviders(user, providerIds);

        if(!user.isFullyRegistered){
            await setIsFullyRegister(user);
        }

        res.json({ providers: userWithProviders.providers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const sendProviders : RequestHandler = async (req, res) => {

    try {
        const providers = await getSavedProviders();

        for (const provider of providers) {
            provider.logo_path = `https://image.tmdb.org/t/p/w500/${provider.logo_path}`;
        }
        res.json({ providers });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
