import { Sequelize } from "sequelize";

export default (sequelize: Sequelize, DataTypes: any) => {
    return sequelize.define('place',
    {
        country: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'La propriété pays d\'une place ne peut pas être vide !' },
                notNull: { msg: 'Le pays de la place est une propriété requise !'},
                is: {
                    args: '^[a-zA-Z- ]+$',
                    msg: 'Le pays de la place ne doit contenir que des lettres !'
                }
            }
        },
        region: {
            type: DataTypes.STRING,
            allowNull: false,            
            unique: { name: 'region', msg: 'La region de la place existe déjà, il doit être unique !'},
            validate: {
                notEmpty: { msg: 'La propriété region d\'une place ne peut pas être vide !' },
                notNull: { msg: 'La region de la place est une propriété requise !'},
                is: {
                    args: '^[a-zA-Z- ]+$',
                    msg: 'La region d\'une place ne doit contenir que des lettres !'
                }
            }
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated'
    });
}