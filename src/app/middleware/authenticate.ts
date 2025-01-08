import { Middleware } from "express-validator/lib/base";
import { checkToken } from "../services/store/userStore.js";

const authenticate : Middleware = async (req, res, next) => {
    try{
        const authorizationHeader = req.headers["authorization"]
        const token = authorizationHeader.split(" ")[1];

        req.body["user"] = await checkToken(token);

        next();
    }
    catch(error){
        res.status(401).json({message: "Invalid token"})
        return;
    }    
} 

export default authenticate;