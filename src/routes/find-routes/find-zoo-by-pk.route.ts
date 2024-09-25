import { Express, Request, Response } from "express"
import findByPkController from "../../controllers/find-by-pk.controller";
import { Zoo } from "../../db/sequelize";

export = (app: Express) => {
    app.get('/api/zoo/:id', (req: Request, res: Response) => {
        findByPkController(req, res, Zoo);
    });
}