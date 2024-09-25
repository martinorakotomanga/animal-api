import { Express, Request, Response } from "express";
import bcryptJs from 'bcryptjs';
import { Administrator } from "../../db/sequelize";
import handleErrorHelper from "../../helpers/handleError.helper";
import isValidPasswordHelper from "../../helpers/is-valid-password.helper";

export = (app: Express) => {
    app.post('/api/signup', (req: Request, res: Response) => {
        const { password } = req.body;

        if(!isValidPasswordHelper(password)) {
            const message = 'Un mot de passe doit contenir à la fois une lettre majuscule, miniscule, nombre, caractères spéciaux avec minimum 8 caractères';
            return res.status(400).json({ message });
        }

        bcryptJs.hash(password, 10)
            .then(async (cryptedPassword: string)=> {
                return Administrator.create({ ...req.body, password: cryptedPassword })
                    .then((user) => {
                        const message = 'La création du compte est avec succès !';
                        return res.json({ message, data: user.dataValues.email });
                    });
            })
            .catch((error: any)=> {
                handleErrorHelper(error, res);
            });
    });
}