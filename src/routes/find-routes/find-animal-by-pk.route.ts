import { Express, Request, Response } from 'express';
import { Animal } from '../../db/sequelize';
import findByPkController from '../../controllers/find-by-pk.controller';

export = (app: Express) => {
    app.get('api/animal/:id', (req: Request, res: Response) => {
        findByPkController(req, res, Animal);
    })
}