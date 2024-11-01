import { RequestHandler } from "express";
import { matchedData } from "express-validator";
import AppDataSource from "../data-source.js";
import { User } from "../entity/User.js";

export const changeSettings : RequestHandler = async (req, res) => {
    const {firstname, lastname, birthdate} = matchedData(req);

    const user = req.body.user;

    const userRepo = AppDataSource.getRepository(User);

    await userRepo.update({id: user.id}, {firstName: firstname, lastName: lastname, birthDate: birthdate});

    const updatedUser : User = await userRepo.findOneBy({id: user.id});
    
    res.status(200).json({user: {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        birthDate: updatedUser.birthDate,
        email: updatedUser.email,
        isFullyRegistered: updatedUser.isFullyRegistered
    }})
}