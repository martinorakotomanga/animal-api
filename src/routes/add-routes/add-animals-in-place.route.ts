import { Express, Request, Response } from "express"
import { AnimalHasPlace, Place } from "../../db/sequelize";
import addAnimalsController from "../../controllers/add-animals-in.controller";
import auth from "../../auth/auth";

export = (app: Express) => {
    app.post('/api/place/:id',auth, async (req: Request, res: Response) => {
        await addAnimalsController(req, res, Place, AnimalHasPlace);
    });
    
}