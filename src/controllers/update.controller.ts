import { Request, Response } from "express";
import handleErrorHelper from "../helpers/handleError.helper";

export default (req: Request, res: Response, table: any) => {
    const { id } = req.params;

    table.update(req.body, { where: { id }, validate: true })
        .then((update)=> {
            return table.findByPk(id)
                .then((dataUpdated: any) => {
                    if(!dataUpdated) {        
                        const message = `Aucun(e) ${ table.name } qui correspond à l'identifiant: ${ id } ! :(`;
                        return res.status(404).json({ message });
                    }
                
                    const message = `La modification de la (ou du) ${ table.name } qui a l'identifiant ${ id } est avec succès ! :)`;
                    res.json({ message, data: dataUpdated });
                })
        })
        .catch((error: any)=> {
            console.log(error);
            handleErrorHelper(error, res);
        });
}