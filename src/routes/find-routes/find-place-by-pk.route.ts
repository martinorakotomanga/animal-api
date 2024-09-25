import { Express, Request, Response } from "express"
import findByPkController from "../../controllers/find-by-pk.controller";
import { Place } from "../../db/sequelize";

export = (app: Express) => {
    app.get('/api/place/:id', (req: Request, res: Response) => {
        findByPkController(req, res, Place);
    });
}