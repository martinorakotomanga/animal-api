import { Sequelize } from "sequelize";

export default (sequelize: Sequelize, DataTypes: any) => {
    const animalHasPlace =  sequelize.define('animals_has_place',   
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        animal_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        place_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        is_origin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'L\'origine de l\'animal ne peut pas être vide !' },
                notNull: { msg: 'L\'origine de l\'animal est une propriété requise !'},
                isValidOrigin(value) {
                    if(value!=false && value!=true) {
                        throw new Error('L\'origine de l\'animal ne peut présentée que par un \'boolean\'');
                    }
                }
            }
        }
    }, {
        indexes: [{
            fields: [ 'animal_id', 'place_id', 'is_origin' ],
            unique: true
        }],
        timestamps: true,
        createdAt: false,
        updatedAt: false
    });

    return animalHasPlace;
}