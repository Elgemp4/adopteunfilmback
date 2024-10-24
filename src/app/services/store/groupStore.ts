import {Group} from "../../entity/Group.js";
import AppDataSource from "../../data-source.js";
import {User} from "../../entity/User.js";


export async function saveGroup(group: Group) {
    const newGroup = new Group();

    const groupRepo = AppDataSource.getRepository(Group);

    const existingGroup = await groupRepo.findOneBy({ name: group.name });

    if (!existingGroup) {
        const newGroup = groupRepo.create({
          name: group.name,
        });

        await groupRepo.save(newGroup);
    }
    return newGroup;
}

export async function saveUserGroups(user: User, groupId: number) {
    const userRepo = AppDataSource.getRepository(User);
    const groupRepo = AppDataSource.getRepository(Group);

    const group = await groupRepo.findOne({ where: { group_id: groupId } });

    if (!group) {
        throw new Error(`Group not found`);
    }

    if (!user.groups) {
        user.groups = [];
    }

    user.groups.push(group);

    await userRepo.save(user);

    return user;
}