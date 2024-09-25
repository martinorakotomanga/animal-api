import animalAddPlacesController from "../../controllers/animal-add-places.controller";
import handleErrorHelper from "../../helpers/handleError.helper";
import { AggregateError, Transaction } from "sequelize";
import { Express, Request, Response } from "express";
import { Animal, sequelize } from "../../db/sequelize";
import auth from "../../auth/auth";

export = (app: Express) => {
    app.post('/api/animal', auth, async (req: Request, res: Response) => {
        
        if(!req.body.places || !req.body.places.length) {
            const message = `La propriété 'places' est requis !`;
            return res.status(400).json({ message });
        }

        try {
            await sequelize.transaction(async (transaction: Transaction)=> {
                return await Animal.create(req.body, { transaction })
                    .then(async (animal: any)=> {
                        return await animalAddPlacesController(transaction, req, animal)
                            .then((result)=> {
                                const message = `L'animal qui se nomme '${ req.body.name }' est ajouté avec succés !`;
                                res.json({ message, data: result });
                            });
                    });
            });

        } catch(error) {
            if(error instanceof AggregateError) {
                const { errors }: any = error;
                return handleErrorHelper(errors[0].errors, res);
            }

            handleErrorHelper(error, res);
        }
    })
}