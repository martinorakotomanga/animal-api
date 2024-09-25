import { Request, Response } from "express";

export default (req: Request, res: Response, table: any) => {
    const { id } = req.params;

    table.findByPk(id)
        .then((dateWillBeDeleted: any)=> {
            if(!dateWillBeDeleted) {
                const message = `Aucun(e) ${ table.name } qui correspond à l'identifiant: ${ id } ! :(`;
                return res.status(404).json({ message });
            }

            return table.destroy({ where: { id } })
                .then(()=> {
                    const message = `La suppression de la (ou du) ${ table.name } qui a l'identifiant ${ id } est avec succès ! :)`;
                    res.json({ message, data: dateWillBeDeleted });
                });
        })
        .catch((error: any)=> {
            const message = "Veuillez réssayer dans quelques instants ! :)";
            res.status(500).json({ message, error });
        });
}