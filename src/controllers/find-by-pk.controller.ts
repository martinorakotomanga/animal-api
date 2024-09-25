import { Request, Response } from 'express';

export default (req: Request, res: Response, table: any) => {
    const { id } = req.params;

    table.findByPk(id)
        .then(data=> {
            if(!data) {
                const message = `Cet/cette ${ table.name } n'existe pas !`;
                return res.status(404).json({ message });
            }

            const message = `L'animal a bien été trouvé !`;
            res.json({ message, data });
        })
        .catch((error: any)=> {
            const message = "Veuillez réssayer dans quelques instants ! :)";
            res.status(500).json({ message, error });
        });    
}