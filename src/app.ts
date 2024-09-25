import express, { Application, NextFunction, Request, Response } from 'express';
import { _authenticate, _initDb } from './db/sequelize';
import cookieParser from 'cookie-parser';
import CORS from 'cors';

const app: Application = express();

const port: number = 8080;

// Middlewares
app.use(express.json())
    .use(CORS())
    .use(cookieParser('cookie!admin@Animal2024'));

// Authentification
_authenticate();

// Initialisation
_initDb();

// Les endPoints : 
// Login
require('./routes/login/login.route')(app);

// SignUp
require('./routes/sign-up/sign-up.route')(app);

//* Add
require('./routes/add-routes/add-animal.route')(app);
require('./routes/add-routes/add-places-of-animal.route')(app);
require('./routes/add-routes/add-animals-in-place.route')(app);
require('./routes/add-routes/add-zoo.route')(app);
require('./routes/add-routes/add-animals-in-zoo.route')(app);

//* Find
require('./routes/find-routes/find-places-of-animal.route')(app);
require('./routes/find-routes/find-animal-by-pk.route')(app);
require('./routes/find-routes/find-animals.route')(app);
require('./routes/find-routes/find-place-by-pk.route')(app);
require('./routes/find-routes/find-zoo-by-pk.route')(app);
require('./routes/find-routes/find-animals-in-place.route')(app);
require('./routes/find-routes/find-animals-in-zoo.route')(app);

//* Update
require('./routes/update-routes/update-animal.route')(app);
require('./routes/update-routes/update-place.route')(app);
require('./routes/update-routes/update-zoo.route')(app);

//* Delete
require('./routes/delete-routes/delete-animal.route')(app);
require('./routes/delete-routes/delete-place.route')(app);
require('./routes/delete-routes/delete-zoo.route')(app);

// PageNotFound
app.use((req: Request, res: Response, next: NextFunction) => {
    const message = 'Hey, le lien que vous avez essayé d\'accéder n\'existe pas ! :(';
    return res.status(404).json({ message });
});

app.listen(port, ()=> {
    console.log(`le server est demaré sur le liens http://localhost:${ port }`);
});