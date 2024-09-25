import animalAddPlaceController from "../../controllers/animal-add-places.controller";
import handleErrorHelper from "../../helpers/handleError.helper";
import { AggregateError, Transaction } from "sequelize";
import { Express, Request, Response } from "express";
import { Animal, sequelize } from "../../db/sequelize";
import auth from "../../auth/auth";

export = (app: Express) => {
    app.post('/api/animal/:id', auth, async (req: Request, res: Response) => {

        if(!req.body.places || !req.body.places.length) {
            const message = `La propriété 'places' est requis !`;
            return res.status(400).json({ message });
        }

        try {
            await sequelize.transaction(async (transaction: Transaction) => {
                const { id } = req.params;

                return await Animal.findByPk(id)
                    .then(async (animal: any)=> {
                        if(animal) {
                            return await animalAddPlaceController(transaction, req, animal)
                            .then((result)=> {
                                const message = `Les places sont ajoutées avec succès sur l'animal qui porte l'Identifiant : ${ id }`;
                                return res.json({ message, data: result });
                            });
                        }
                        
                        const message = `Aucun Animal qui correspond à l' identifiant : ${ id }`;
                        return res.status(404).json({ message });
                    });
            })

        } catch(error) {
            if(error instanceof AggregateError) {
                const { errors }: any = error;
                return handleErrorHelper(errors[0].errors, res);
            }

            handleErrorHelper(error, res);
        }
    });
}