
import { RequestHandler } from "express";
import AppDataSource from "../data-source.js";
import { User } from "../entity/User.js";



export const login : RequestHandler = async (req, res) => {
    const userRepo = AppDataSource.getRepository(User);

    
    const user = new User();
    user.firstName = "Emilien"
    user.lastName = "Marquegnies"
    user.birthDate = new Date(2004, 10, 9);
    
    await userRepo.save(user);
    const users = await userRepo.find();
    
    res.json({"users" : users});
}