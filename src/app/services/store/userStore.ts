import AppDataSource from "../../data-source.js";
import { User } from "../../entity/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RefreshToken from "../../entity/RefreshToken.js";


export async function createToken(user : User) {
    const token = jwt.sign({
        userId: user.id,
    }, "test123", {expiresIn: "1h"})

    return token;
}

export async function createRefreshToken(user: User) {
    const refreshToken = new RefreshToken();

    const token = jwt.sign({
        userId: user.id,
    }, "test123", {expiresIn: "20d"})

    refreshToken.user = user;
    refreshToken.token = token;

    const userTokenRepo = AppDataSource.getRepository(RefreshToken);

    return await userTokenRepo.save(refreshToken);
}

export async function checkToken(token: string){
    const data : any = jwt.verify(token, "test123");

    const userRepo = AppDataSource.getRepository(User);
    
    return await userRepo.findOneBy({id: data.userId});
}

export async function checkRenewToken(token : string) { 
    const decodedToken : any  = jwt.verify(token, "test123");

    const userRepo = AppDataSource.getRepository(User);
    const tokenRepo = AppDataSource.getRepository(RefreshToken);

    const foundToken : RefreshToken = await tokenRepo.findOneBy({token: token});

    if(foundToken.expirationDate.getTime() < new Date().getTime()){
        throw new Error("Invalid token");
    }

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

export async function createUser(firstName: string, lastName: string, email: string, password: string, birthDate: string) : Promise<User>{
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

export async function setIsFullyRegister(user : User) : Promise<User> {
    const userRepo = AppDataSource.getRepository(User);

    user.isFullyRegistered = true;
    await userRepo.update({id: user.id}, {isFullyRegistered: true})

    return user;
}
