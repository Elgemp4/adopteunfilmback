
import { RequestHandler } from "express";
import { checkRenewToken , createRefreshToken, createToken, createUser, tryLogin, checkToken, getUserIdFromToken } from "../services/store/userStore.js";
import { matchedData} from "express-validator";
import { User } from "../entity/User.js";
import jwt from "jsonwebtoken";

export const login : RequestHandler = async (req, res) => {
    const {email, password} = matchedData(req);

    try{
        const user = await tryLogin(email, password);

        const jsonResponse = await createRefreshAndNormalToken(user);
        res.json(jsonResponse);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}

export const register : RequestHandler = async (req, res) => {
    const {email, password, firstname, lastname, birthdate} = matchedData(req);
    try{
        const newUser = await createUser(firstname, lastname, email, password, birthdate)
    
        const jsonResponse = await createRefreshAndNormalToken(newUser);
        res.json(jsonResponse);
    }catch(error){
        res.status(400).json({message: error})
    }   
}

export const renewToken : RequestHandler = async (req, res) => {

    const {token, refreshToken } = matchedData(req);

    try{
        const userId = getUserIdFromToken(token);
        
        const user = await checkRenewToken(refreshToken);
        
        if(user.id != userId){
            throw new Error();
        }

        const newToken = await createToken(user);        

        res.json({
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                birthDate: user.birthDate,
                isFullyRegistered: user.isFullyRegistered
            },
            token: newToken
        });   
    }
    catch(error){
        res.status(400).json({"message": "Bad renew token"});
    }
}

export const checkTokenController : RequestHandler = async (req, res) => {
    res.status(200).json({"message": "Token is valid"})
}


const createRefreshAndNormalToken = async (user: User) => {
    const token = await createToken(user); 
    const refreshToken = await createRefreshToken(user);

    return {
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthDate: user.birthDate,
            isFullyRegistered: user.isFullyRegistered
        },
        token,
        refreshToken: refreshToken.token
    }
}