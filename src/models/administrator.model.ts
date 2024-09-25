import { Sequelize } from "sequelize";

export default (sequelize: Sequelize, DataTypes: any) => {
    return sequelize.define('administrator', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: { name: 'email', msg: 'La valeur de la propriété adresse email existe déjà !' },
            validate: {
                isEmail: { msg: 'C\'est n\'est pas une adresse email !' },
                notNull: { msg: 'L\'adresse email est une propriété requise !' },
                notEmpty: { msg: 'L\'adresse email ne peut pas être vide !' }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}