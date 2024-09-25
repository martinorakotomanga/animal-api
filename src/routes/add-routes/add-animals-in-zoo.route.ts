import { Express, Request, Response } from "express"
import { AnimalHasZoo, Zoo } from "../../db/sequelize";
import addAnimalsController from "../../controllers/add-animals-in.controller";
import auth from "../../auth/auth";

export = (app: Express) => {
    app.post('/api/zoo/:id', auth, async (req: Request, res: Response) => {
        addAnimalsController(req, res, Zoo, AnimalHasZoo);
    });
}