import handleErrorHelper from "../../helpers/handleError.helper";
import { Place, Zoo, sequelize } from "../../db/sequelize";
import { Express, Request, Response } from "express";
import { Transaction } from "sequelize";
import auth from "../../auth/auth";

export = (app: Express) => {
    app.post('/api/zoo', auth, async (req: Request, res: Response) => {

        if(!req.body.place) {
            const message = `La propriété 'place' est requis !`;
            return res.status(400).json({ message });
        }

        try {
            const result = await sequelize.transaction(async (transaction: Transaction)=> {
                const place = req.body.place;

                if(!place.id) {
                    await Place.create(place, { transaction }).then((createdPlace)=> {
                        return place.id = createdPlace.dataValues.id;
                    });
                }

                return await Zoo.create({
                        place_id: place.id,
                        ...req.body
                    }, { transaction }
                );
            })

            const message = `L'ajout du Zoo ${ req.body.name } est avec succès !`;
            res.json({ message, data: result })

        } catch(error) {
            handleErrorHelper(error, res);
        }
    })
}