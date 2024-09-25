import { Sequelize } from "sequelize";

export default (sequelize: Sequelize, DataTypes: any) => {
    return sequelize.define("zoo", 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: { msg: 'Le nom du Zoo ne peut pas être vide !' },
                notNull: { msg: 'Le nom du Zoo est une propriété requise !'},
                is: {
                    args: '^[a-zA-Z- ]+$',
                    msg: 'Le nom du Zoo ne doit contenir que des lettres !'
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'La déscription du Zoo ne peut pas être vide !' },
                notNull: { msg: 'La déscription du Zoo est une propriété requise !'}
            }
        },
        place_id: {
            type: DataTypes.INTEGER,
            unique: { name: 'foreignKey', msg: 'Cette place a dejà un Zoo, qui se nomme differament de celle-ci !'}
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated'
    });
}