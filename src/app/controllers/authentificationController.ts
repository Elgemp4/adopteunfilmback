
import { RequestHandler, Response } from "express";
import { checkRenewToken as getUserFromRefreshToken, createRefreshToken, createToken, createUser, tryLogin, checkToken } from "../services/store/userStore.js";
import { matchedData} from "express-validator";
import { User } from "../entity/User.js";

export const login : RequestHandler = async (req, res) => {
    const {email, password} = matchedData(req);

    try{
        const user = await tryLogin(email, password);

        await setRefreshTokenCookie(user, res);
        await sendToken(user, res);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}

export const register : RequestHandler = async (req, res) => {
    const {email, password, firstname, lastname, birthdate} = matchedData(req);
    try{
        const newUser = await createUser(firstname, lastname, email, password, birthdate)
    
        await setRefreshTokenCookie(newUser, res);
        await sendToken(newUser, res);
    }catch(error){
        res.status(400).json({message: error})
    }   
}

export const renewToken : RequestHandler = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    try{
        const user = await getUserFromRefreshToken(refreshToken);

        await sendToken(user, res);    
    }
    catch(error){
        res.status(400).json({"message": "Bad renew token"});
    }
}

export const checkTokenController : RequestHandler = async (req, res) => {
    res.status(200).json({"message": "Token is valid"})
}


const setRefreshTokenCookie = async (user: User, res: Response) => {
    const refreshToken = await createRefreshToken(user);

    res.cookie("refreshToken", refreshToken.token, {
        httpOnly: true,
        domain: "localhost",
        maxAge: 20 * 86400000, //20 jours
        path: "/renew"
    })
}


const sendToken = async (user: User, res : Response) => {
        const token = await createToken(user);        

        res.json({
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                birthDate: user.birthDate,
                isFullyRegistered: user.isFullyRegistered
            },
            token: token
        });
}