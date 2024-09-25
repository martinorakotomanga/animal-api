import { Express, Request, Response } from "express"
import { Animal, Place, Zoo } from "../../db/sequelize";
import findManyInOneController from "../../controllers/find-many-in-one.controller";

export = (app: Express) => {
    app.get('/api/zoo/:id/animals', (req: Request, res: Response) => {
        findManyInOneController(req, res, Zoo, Animal);
    });
}