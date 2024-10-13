import { Middleware } from "express-validator/lib/base";
import AppDataSource from "../data-source.js";
import UserToken from "../entity/UserToken.js";
import { User } from "../entity/User.js";

const authenticate : Middleware = async (req, res, next) => {
    const authorizationHeader = req.headers["authorization"]

    if(authorizationHeader == undefined){
        res.status(401).json({message: "Please provide valid token"});
        return;
    }

    const token = authorizationHeader.split(" ")[1];

    const tokenRepo = AppDataSource.getRepository(UserToken);
    const userRepo = AppDataSource.getRepository(User);

    const matchingToken = await tokenRepo.findOne({
        where:{
            token
        },
        relations: ['user']
    });

    if(matchingToken == undefined){
        res.status(401).json({message: "Invalid token"});
        return;   
    }

    if(matchingToken.expirationDate.getTime() < new Date().getTime()){
        res.status(401).json({message: "Token expired"});
        return;   
    }

    const user = matchingToken.user;

    req.body["user"] = user;

    next();
} 

export default authenticate;