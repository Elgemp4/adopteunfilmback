import { ContextRunner } from "express-validator";
import { Middleware } from "express-validator/lib/base";


//SOURCE OF CODE : https://express-validator.github.io/docs/guides/manually-running

const validate = (validations: ContextRunner[]) : Middleware => {
    return async (req, res, next) => {
      // sequential processing, stops running validations chain if one fails.
      for (const validation of validations) {
        const result = await validation.run(req);
        if (!result.isEmpty()) {
          return res.status(400).json({ errors: result.array() });
        }
      }
  
      next();
    };
  };


export default validate;