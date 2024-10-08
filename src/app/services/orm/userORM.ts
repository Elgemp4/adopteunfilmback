import AppDataSource from "../../data-source.js";
import { User } from "../../entity/User.js";
import bcrypt from "bcrypt";


export async function tryLogin(email: string, password : string){
    const userRepo = AppDataSource.getRepository(User);

    const users = await userRepo.findBy({ email });
    if(users.length == 0 || !await bcrypt.compare(password, users[0].password)){
        return null;
    }

    const user = users[0];

    return user;
}