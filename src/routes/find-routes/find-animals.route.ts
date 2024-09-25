import { Express, Request, Response } from "express"
import { Animal } from "../../db/sequelize";
import { Op } from "sequelize";
import { count } from "console";

export = (app: Express) => {
    app.get('/api/animals', async (req: Request, res: Response) => {
        const { limit, scientific_name } = req.query;

        if(!scientific_name) {
            return Animal.findAll({
                limit: typeof limit == 'number' ? limit : 10
            })
                .then(animals=> {
                    const message = `Les animaux sont bien été trouvés !`;
                    res.json({ message, data: animals });                
                })
                .catch((error: any)=> {
                    const message = "Veuillez réssayer dans quelques instants ! :)";
                    res.status(500).json({ message, error });
                });
        }

        Animal.findAndCountAll({
            where: { scientific_name: {
                [Op.like]: `%${scientific_name}%`
            }},
            limit: typeof limit == 'number' ? limit : 10
        })
            .then(({ rows, count })=> {
                const message = `Il y a ${ count } animaux qui correspondent à cet nom scientifique: !`;
                res.json({ message, data: rows });                
            })
            .catch((error: any)=> {
                const message = "Veuillez réssayer dans quelques instants ! :)";
                res.status(500).json({ message, error });
            });
    });
}