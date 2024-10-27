import { Middleware } from "express-validator/lib/base";
import AppDataSource from "../data-source.js";
import UserToken from "../entity/UserToken.js";
import { User } from "../entity/User.js";
import jwt from "jsonwebtoken";

const authenticate : Middleware = async (req, res, next) => {
    try{
        const authorizationHeader = req.headers["authorization"]
        const token = authorizationHeader.split(" ")[1];

        const data : any = jwt.verify(token, "test123");
        const userRepo = AppDataSource.getRepository(User);

        const user = userRepo.findOneBy({id: data.userId});

        req.body["user"] = user;

        next();
    }
    catch(_){
        res.status(401).json({message: "Invalid token"})
    }    
} 

export default authenticate;