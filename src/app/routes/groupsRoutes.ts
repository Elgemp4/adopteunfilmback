import {Router} from "express";
import authenticate from "../middleware/authenticate.js";
import {
    createGroupHandler,
    getUserPersonalGroups,
    joinGroupHandler,
    getGroupUsersHandler, getGroupCodeHandler
} from "../controllers/groupsController.js";
import validate from "../middleware/validate.js";
import {body} from "express-validator";

const groupRouter = Router();

groupRouter.get("/",
    authenticate,
    getUserPersonalGroups
)

groupRouter.post("/create",
    authenticate,
    validate([
        body("name").isString().escape()
    ]),
    createGroupHandler
)

groupRouter.post("/join",
    authenticate,
    validate([
        body("code").isString().escape()
    ]),
    joinGroupHandler
)

groupRouter.get("/:groupId/users",
    authenticate,
    getGroupUsersHandler
);

groupRouter.get("/:groupId/code",
    authenticate,
    getGroupCodeHandler
);

export default groupRouter;