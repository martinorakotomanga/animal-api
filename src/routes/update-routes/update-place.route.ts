import { Express, Request, Response } from "express"
import { Place } from "../../db/sequelize";
import updateController from "../../controllers/update.controller";
import auth from "../../auth/auth";

export = (app: Express) => {
    app.put('/api/place/:id', auth, (req: Request, res: Response) => {
        updateController(req, res, Place);
    });
}