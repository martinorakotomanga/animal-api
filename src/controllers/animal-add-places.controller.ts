import { Request } from "express";
import { Transaction } from "sequelize";
import { Place, Animal, AnimalHasPlace } from "../db/sequelize";

export = async (transaction: Transaction, req: Request, animal: any) => {
    const existedPlaces: any[] = [];
    const newPlaces: any[] = [];

    req.body.places.forEach((place: any) => {
        if(place.id) {
            return existedPlaces.push({
                animal_id: animal.id,
                place_id: place.id,
                is_origin: place.is_origin
            });
        }

        newPlaces.push(place);
    });

    await AnimalHasPlace.bulkCreate(existedPlaces, { transaction, validate: true  });

    await Place.bulkCreate(newPlaces, { transaction, validate: true  })
        .then(async (createdPlaces)=> {
            for(let i=0; i<createdPlaces.length; i++) {
                newPlaces[i].place_id = createdPlaces[i].dataValues.id;
                newPlaces[i].animal_id = animal.id;
            }

            await AnimalHasPlace.bulkCreate(newPlaces, { transaction, validate: true });
        });

    return await Animal.findByPk(animal.id, { transaction })
        .then(async ()=> {
            return await AnimalHasPlace.findAll({
                where: { animal_id: animal.id },
                limit: 5,
                order: [[ 'id', 'DESC' ]],
                transaction
            })
                .then(animal_has_places=> {
                    return { animal, places: animal_has_places }
                });
        });
}