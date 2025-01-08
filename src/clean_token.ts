//This is a script that is intended to the expired refresh tokens from the database

import AppDataSource from './app/data-source.js'
import { LessThan } from 'typeorm'
import RefreshToken from './app/entity/RefreshToken.js'


async function cleanToken() {
    const tokenRepo = AppDataSource.getRepository(RefreshToken);
    await tokenRepo.delete({
        expirationDate: LessThan(new Date())
    })
}

AppDataSource.initialize()
    .then(async () => {
        await AppDataSource.synchronize();
        console.log("Connected to database");
        await cleanToken();
        console.log("Tokens cleaned");
        await AppDataSource.destroy();
    })
    .catch((error) => console.log(error))


