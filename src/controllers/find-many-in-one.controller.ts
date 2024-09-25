import { Request, Response } from "express";
import { Op } from "sequelize";

export = (req: Request, res: Response, tableOne: any, tableMany: any) => {
    const { id }: any = req.params;
    const { limit, ref, region, scientific_name }: any = req.query;

    const fieldFindall = tableMany.name == 'place' ? 'region' : 'scientific_name';
    const valueFind = tableMany.name == 'place' ? region : scientific_name;

    tableOne.findByPk(id)
        .then((dataOne: any) => {
            if(!dataOne) {
                const message = `Aucun(e) ${ tableOne.name } qui correspond à l'identifiant: ${ id }`;
                return res.status(404).json({ message });
            }
            
            return tableMany.findAll({
                where: { [ fieldFindall ]: { [Op.like]: valueFind ? `%${ valueFind }%` : '%%' } },
                include: {
                    model: tableOne,
                    where: { id },
                    attributes: ['id'],
                    through: { attributes: [] },
                    required: ref ? ref.toLowerCase() == 'false' : false
                },
                limit: typeof limit == 'number' ? limit : 10    
            })
                .then((dataMany) => {
                    const message = `Les ${ tableMany.name }s de ${ tableOne.name }: ${ dataOne.dataValues.name ?? dataOne.dataValues.region }, id: ${ id } sont bien été trouvé(e)s !`;
                    return res.json({ message, data: dataMany });                        
                });
        })
        .catch((error: any)=> {
            const message = "Veuillez réssayer dans quelques instants ! :)";
            res.status(500).json({ message, error });
        });
}