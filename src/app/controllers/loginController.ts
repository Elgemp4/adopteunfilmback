
import { RequestHandler } from "express";
import { tryLogin } from "../services/orm/userORM.js";
import { matchedData, validationResult } from "express-validator";



export const login : RequestHandler = async (req, res) => {
    const error = validationResult(req);
    
    if(!error.isEmpty()){
        res.json({message: "Bad request"});
        return;
    }

    const {email, password} = matchedData(req);
    
    const user = await tryLogin(email, password);

    console.log(user);
    
    res.json(user);
}