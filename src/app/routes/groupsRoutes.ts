import {Router} from "express";
import authenticate from "../middleware/authenticate.js";
import {
    createGroupHandler,
    getGroupSuggestions,
    getUserPersonalGroups,
    joinGroupHandler
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

groupRouter.get("/:id/suggestions", authenticate, getGroupSuggestions);

groupRouter.post("/join",
    authenticate,
    validate([
        body("code").isString().escape()
    ]),
    joinGroupHandler
)

export default groupRouter;