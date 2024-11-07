import {Group} from "../../entity/Group.js";
import AppDataSource from "../../data-source.js";
import {User} from "../../entity/User.js";
import { v4 as uuidv4 } from 'uuid';

function generateGroupCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export async function createGroup(group: Group, owner: User) {
    const groupRepo = AppDataSource.getRepository(Group);
    const userRepo = AppDataSource.getRepository(User);

    const existingGroup = await groupRepo.findOneBy({ name: group.name });

    if (!existingGroup) {
        const newGroup = groupRepo.create({
            name: group.name,
            code: generateGroupCode(),
            owner: owner,
        });

        await groupRepo.save(newGroup);

        if (!owner.groups) {
            owner.groups = [];
        }
        owner.groups.push(newGroup);
        await userRepo.save(owner);

        return newGroup;
    }

    return existingGroup;
}

export async function joinGroup(code: string, user: User) {
    const userRepo = AppDataSource.getRepository(User);
    const groupRepo = AppDataSource.getRepository(Group);

    const group = await groupRepo.findOne({ where: { code }, relations: ["users"] });

    if (!group) {
        throw new Error(`Group not found`);
    }

    const userWithGroups = await userRepo.findOne({ where: { id: user.id }, relations: ["groups"] });

    if (!userWithGroups) {
        throw new Error(`User not found`);
    }

    if (userWithGroups.groups.some(g => g.group_id === group.group_id)) {
        throw new Error("Vous êtes déjà membre de ce groupe"); //TODO : Mieux gérer l'erreur (renvoyer l'erreur au client)
    }

    userWithGroups.groups.push(group);

    await userRepo.save(userWithGroups);

    return group;
}

export async function getUserGroups(userId: number) {
    const userRepo = AppDataSource.getRepository(User);
    const userWithGroups = await userRepo.findOne({ where: { id: userId }, relations: ["groups"] });

    if (!userWithGroups) {
        throw new Error(`User not found`);
    }

    return userWithGroups.groups;
}