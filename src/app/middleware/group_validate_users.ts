import { Middleware } from "express-validator/lib/base";
import { getUserInGroup } from "../services/store/groupStore.js";

const isArrayOfStrings = (value: any): value is string[] =>
    Array.isArray(value) && value.every((item) => typeof item === 'string');

const parseUsers = (query: any): number[] => {
    const users = query.u;
    let selectedUsersId : number[] = [];

    if(!isArrayOfStrings(users) && typeof users !== "string"){
        throw new Error("Invalid query parameter");
    }
    
    if(typeof users === "string"){
        selectedUsersId = [parseInt(users)];
    }
    else{
        selectedUsersId = users.map((id: string) => parseInt(id));
    }

    return selectedUsersId;
}

const isUsersInGroup = async (groupId: number, usersId: number[]) => {
    const groupUsers = await getUserInGroup(groupId);
    if(usersId.some(id => !groupUsers.some(user => user.id === id))) throw new Error("A user is not in the group");
};

const groupe_validate_users : Middleware = async (req, res, next) => {
    try{
        const groupId = parseInt(req.params.id);
        const usersId = parseUsers(req.query);
        await isUsersInGroup(groupId, usersId);
        req.body["selectedUsersId"] = usersId;
        next();
    }
    catch(error){
        res.status(400).json({message: error.message});
        return;
    }
}


export default groupe_validate_users