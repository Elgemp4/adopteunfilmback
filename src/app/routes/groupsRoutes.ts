import {Router} from "express";
import authenticate from "../middleware/authenticate.js";
import {
    createGroupHandler,
    getGroupSuggestions,
    getUserPersonalGroups,
    joinGroupHandler,
    setMovieSeenByGroup
} from "../controllers/groupsController.js";
import validate from "../middleware/validate.js";
import {body} from "express-validator";
import group_validate_users from "../middleware/group_validate_users.js";

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
);

groupRouter.get("/:id/suggestions/:start", 
    authenticate, 
    group_validate_users,
    getGroupSuggestions
);

groupRouter.post("/:id/seen/:movieId",
    authenticate,
    group_validate_users,
    setMovieSeenByGroup
);

groupRouter.post("/join",
    authenticate,
    validate([
        body("code").isString().escape()
    ]),
    joinGroupHandler
)

export default groupRouter;