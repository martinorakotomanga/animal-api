import handleErrorHelper from "../helpers/handleError.helper";
import { Transaction, AggregateError } from "sequelize";
import { Request, Response } from "express";
import { sequelize } from "../db/sequelize";

export default async (req: Request, res: Response, table: any, joinTable: any) => {   
    const { id } = req.params;
    let dataJoinTable: any;

    if(!req.body.animals || !req.body.animals.length) {
        const message = `La propriété 'animals' est requis !`;
        return res.status(400).json({ message });
    }

    try {
        await sequelize.transaction(async (transaction: Transaction) => {
            await table.findByPk(id, { transaction })
                .then(async (data: any)=> {
                    if(data) { 
                        dataJoinTable = req.body.animals.map((animal: any)=> {
                            return {
                                animal_id: animal.id,
                                [`${table.name}_id`]: data.id,
                                is_origin: animal.is_origin
                            };
                        });

                        return await joinTable.bulkCreate(dataJoinTable, {
                            validate: true,
                            transaction 
                        })
                            .then((animals)=> {
                                const message = `Les animals sont ajoutées avec succès dans le ${ table.name } qui porte l'Identifiant : ${ id }`;
                                return res.json({ message, data: animals });
                            });
                    }
                    const message = `Aucun(e)  ${ table.name }  qui correspond à l' identifiant : ${ id }`;
                    return res.status(404).json({ message });
                });
        });
    } catch (error) {
        if(error instanceof AggregateError) {
            const { errors }: any = error;
            return handleErrorHelper(errors[0].errors, res);
        }

        handleErrorHelper(error, res);
    }
};