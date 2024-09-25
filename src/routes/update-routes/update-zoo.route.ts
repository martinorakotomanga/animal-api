import { Express, Request, Response } from "express"
import { Zoo } from "../../db/sequelize";
import updateController from "../../controllers/update.controller";
import auth from "../../auth/auth";

export = (app: Express) => {
    app.put('/api/zoo/:id', auth, (req: Request, res: Response) => {
        updateController(req, res, Zoo);
    });
}