import { Express, Request, Response } from "express";
import { Animal } from "../../db/sequelize";
import deleteController from "../../controllers/delete.controller";
import auth from "../../auth/auth";

export = (app: Express) => {
    app.delete('/api/animal/:id', auth, (req: Request, res: Response) => {
        deleteController(req, res, Animal);
    })
}