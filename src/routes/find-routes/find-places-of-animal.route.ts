import { Express, Request, Response } from "express";
import { Animal, Place } from "../../db/sequelize";
import findManyInOneController from "../../controllers/find-many-in-one.controller";

export = (app: Express) => {
    app.get('/api/animal/:id/places', (req: Request, res: Response) => {        
        findManyInOneController(req, res, Animal, Place);
    });
}