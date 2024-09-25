import { ForeignKeyConstraintError, UniqueConstraintError, ValidationError } from "sequelize";
import { Response } from "express";

export default (error: Error, res: Response) => {
    if(error instanceof UniqueConstraintError || error instanceof ValidationError) {
        const errors = error.errors[0];
        return res.status(400).json({ message: errors.message });
    }
    
    if(error instanceof ForeignKeyConstraintError) {
        const sqlString = (error.sql.split(');')[0]);
        const indexId = error.table == 'animals' ? sqlString[sqlString.length-3] : sqlString[sqlString.length-1];
        const idValues = error.value ?? indexId;

        const message = `Aucun(e)(s) ${ error.table } qui correspond à l'identifiant: ${ idValues } ! :(`;
        return res.status(404).json({ message, error });
    }

    const message = "Veuillez réssayer dans quelques instants ! :)";
    res.status(500).json({ message, error });
}