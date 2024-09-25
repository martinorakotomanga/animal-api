import { Request, Response, NextFunction } from "express";
import privateKey from "./private-key";
import JWT from "jsonwebtoken";

export = (req: Request, res: Response, next: NextFunction) => {
    const { animalTokenAdmin } = req.signedCookies;

    if(!animalTokenAdmin) {
        const message = `Aucun token fourni dans \'la cookie reçue !`;
        return res.status(403).json({ message });
    }

    JWT.verify(animalTokenAdmin, privateKey, (error: Error, decodedToken: any) => {
        
        if(error) {
            const message = `L'utilisateur n\'est pas autorisé à accèder à cette ressource !`;
            return res.status(403).json({ message });            
        } else if(!decodedToken.userId) {
            const message = `L'idenfiant de l'utilisateur est invalid !`;
            return res.status(403).json({ message });            
        }

        next();
    })
}