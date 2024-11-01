import {Group} from "../../entity/Group.js";
import AppDataSource from "../../data-source.js";
import {User} from "../../entity/User.js";
import { v4 as uuidv4 } from 'uuid';

function generateGroupCode() {
    return uuidv4();
}

export async function createGroup(group: Group, owner: User) {
    const groupRepo = AppDataSource.getRepository(Group);

    const existingGroup = await groupRepo.findOneBy({ name: group.name });

    if (!existingGroup) {
        const newGroup = groupRepo.create({
            name: group.name,
            code: uuidv4(),
            owner: owner,
        });

        await groupRepo.save(newGroup);
        return newGroup;
    }

    return existingGroup;
}

export async function joinGroup(code: string, user: User) {
    const userRepo = AppDataSource.getRepository(User);
    const groupRepo = AppDataSource.getRepository(Group);

    const group = await groupRepo.findOne({ where: { code } });

    if (!group) {
        throw new Error(`Group not found`);
    }

    if (!user.groups) {
        user.groups = [];
    }

    user.groups.push(group);

    await userRepo.save(user);

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