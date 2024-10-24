import AppDataSource from "../../data-source.js";
import { User } from "../../entity/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserToken from "../../entity/UserToken.js";


export async function createToken(user : User) {
    const token = jwt.sign({
        userId: user.id,
    }, "test123", {expiresIn: "1h"})

    return token;
}

export async function createRefreshToken(user: User) {
    const refreshToken = new UserToken();

    const token = jwt.sign({
        userId: user.id,
    }, "test123", {expiresIn: "1h"})

    refreshToken.user = user;
    refreshToken.token = token;

    const userTokenRepo = AppDataSource.getRepository(UserToken);

    return await userTokenRepo.save(refreshToken);
}

export async function checkRenewToken(token : string) {
    const decodedToken : any  = jwt.verify(token, "test123");

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({id: decodedToken.userId})
    return user;
}

export async function tryLogin(email: string, password : string){
    const userRepo = AppDataSource.getRepository(User);

    const users = await userRepo.findBy({ email });
    if(users.length == 0 || !await bcrypt.compare(password, users[0].password)){
        throw new Error("Bad credentials");
    }

    const user = users[0];

    user.password = undefined;

    return user;
}

export async function createUser(firstName: string, lastName: string, email: string, password: string, birthDate: Date){
    let newUser = new User();

    const userRepo = AppDataSource.getRepository(User);

    newUser.email = email;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.birthDate = birthDate;
    newUser.password = password;

    newUser = await userRepo.save(newUser);

    newUser.password = undefined;

    return newUser;
}