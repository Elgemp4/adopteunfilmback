
import { RequestHandler } from "express";
import { createToken, createUser, tryLogin } from "../services/orm/userORM.js";
import { matchedData, validationResult } from "express-validator";
import UserToken from "../entity/UserToken.js";
import { DataSource } from "typeorm";
import AppDataSource from "../data-source.js";
import { User } from "../entity/User.js";




export const login : RequestHandler = async (req, res) => {
    const {email, password} = matchedData(req);
    
    try{
        const user = await tryLogin(email, password);

        const newToken = await createToken(user);

        res.json({
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                birthDate: user.birthDate
            },
            token: newToken.token
        });
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}

export const register : RequestHandler = async (req, res) => {
    const {email, password, firstname, lastname, birthdate} = matchedData(req);

    const newUser = await createUser(firstname, lastname, email, password, birthdate)
    
    const newToken = await createToken(newUser);

    res.json({
        user: {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            birthDate: newUser.birthDate
        },
        token: newToken.token
    });
}