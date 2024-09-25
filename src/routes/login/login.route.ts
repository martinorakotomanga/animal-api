import { Express, Request, Response } from "express";
import bcryptJs from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { Administrator } from "../../db/sequelize";
import privateKey from "../../auth/private-key";

export = (app: Express) => {
    app.post('/api/login', (req: Request, res: Response) => {
        const { email, password } = req.body;

        if(email && password) {
            return Administrator.findOne({ where: { email }})
                .then((user) => {
                    if(user) { 
                        return bcryptJs.compare(password, user.dataValues.password)
                            .then(async (isValidPassword) => {  
                                if(!isValidPassword) {
                                    const message = 'Le mot de passe est incorrecte !'
                                    return res.status(401).json({ message, isValidPassword });
                                }

                                const token = JWT.sign(
                                    { userId: user.dataValues.id },
                                    privateKey,
                                    { expiresIn: '24h' }
                                );

                                const message = 'Vous êtes connectés avec succès !';
                                res.cookie('animalTokenAdmin', token, 
                                    {
                                        httpOnly: true,
                                        signed: true
                                    }
                                );
                                return res.json({ message });
                                
                            });
                    }

                    const message = 'Cette adresse email n\'existe pas !';
                    return res.status(404).json({ message });
                })
                .catch((error: any)=> {
                    const message = "L'utilisateur n'a pas pu être connecté. Réssayer dans quelques instants ! :)";
                    res.status(500).json({ message, error });
                });

        } else {
            const message = 'Pour se connecter, vous devez fournir le mot de passe et l\' adresse email !';
            res.status(400).json({ message });
        }
    });
}