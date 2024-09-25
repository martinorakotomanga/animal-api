import { Sequelize, DataTypes } from "sequelize";
import animalModel from "../models/animals.model";
import animalPlaceModel from "../models/animal-place.model";
import animalZooModel from "../models/animal-zoo.model";
import zooModel from "../models/zoos.model";
import placeModel from "../models/places.model";
import administratorModel from "../models/administrator.model";

const sequelize = new Sequelize(
    'gestion_animaux',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: false
    }
);

// Models
const AnimalHasPlace = animalPlaceModel(sequelize, DataTypes);
const AnimalHasZoo = animalZooModel(sequelize, DataTypes)
const Animal = animalModel(sequelize, DataTypes);
const Zoo = zooModel(sequelize, DataTypes);
const Place = placeModel(sequelize, DataTypes);
const Administrator = administratorModel(sequelize, DataTypes);

// Association ANIMAL-PLACE
Animal.belongsToMany(Place, { through: AnimalHasPlace, foreignKey: 'animal_id', otherKey: 'place_id', onDelete: 'CASCADE' });
Place.belongsToMany(Animal, { through: AnimalHasPlace, foreignKey: 'place_id', otherKey: 'animal_id', onDelete: 'CASCADE' });

// Association ANIMAL-ZOO 
Animal.belongsToMany(Zoo, { through: AnimalHasZoo, foreignKey: 'animal_id', otherKey: 'zoo_id', onDelete: 'CASCADE' });
Zoo.belongsToMany(Animal, { through: AnimalHasZoo, foreignKey: 'zoo_id', otherKey: 'animal_id', onDelete: 'CASCADE' });

// Association PLACE-ZOO 
Place.hasMany(Zoo, { foreignKey: 'place_id', onDelete: 'CASCADE' });
Zoo.belongsTo(Place, { foreignKey: 'place_id', onDelete: 'CASCADE' });

const queryInterface = sequelize.getQueryInterface();

const _authenticate = async() => {
    return sequelize.authenticate()
        .then(()=> console.log('Connexion réussie !'))
        .catch(error => console.log(`Problème de connexion : ${ error }`))
};

const _initDb = () => {
    sequelize.sync({ force: true })
        .then(async ()=> {
            await queryInterface.removeIndex('animals_has_places', 'animals_has_places_place_id_animal_id_unique');
            console.log('la base de donnée a bien été synchronisée !');
        })
        .catch(error => console.log(`erreur de connexion, error: ${ error }`))
} 

export {
    sequelize,
    _authenticate,
    _initDb,
    Animal,
    Place,
    AnimalHasPlace,
    AnimalHasZoo,
    Zoo,
    Administrator
};