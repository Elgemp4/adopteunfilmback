
import { RequestHandler } from "express";
import { tryLogin } from "../services/orm/userORM.js";
import { matchedData, validationResult } from "express-validator";
import UserToken from "../entity/UserToken.js";
import { DataSource } from "typeorm";
import AppDataSource from "../data-source.js";




export const login : RequestHandler = async (req, res) => {
    const {email, password} = matchedData(req);
    console.log("executed");
    
    const user = await tryLogin(email, password);

    const token = new UserToken();

    token.user = user;

    const userTokenRepo = AppDataSource.getRepository(UserToken);

    const savedToken = await userTokenRepo.save(token);

    res.json({
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthDate: user.birthDate
        },
        token: savedToken.token
    });
}