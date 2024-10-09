import AppDataSource from "../../data-source.js";
import { User } from "../../entity/User.js";
import bcrypt from "bcrypt";
import UserToken from "../../entity/UserToken.js";


export async function createToken(user : User) {
    const token = new UserToken();

    token.user = user;

    const userTokenRepo = AppDataSource.getRepository(UserToken);

    return await userTokenRepo.save(token);
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