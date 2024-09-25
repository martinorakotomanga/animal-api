import { Express, Request, Response } from "express"
import { Animal } from "../../db/sequelize";
import updateController from "../../controllers/update.controller";
import auth from "../../auth/auth";

export = (app: Express) => {
    app.put('/api/animal/:id', auth, (req: Request, res: Response) => {
        updateController(req, res, Animal);
    });
}