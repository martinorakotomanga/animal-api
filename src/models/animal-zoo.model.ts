import { Sequelize } from "sequelize";

export default (sequelize: Sequelize, DataTypes: any) => {
    return sequelize.define('animal_has_zoo', 
    {
        zoo_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        timestamps: true,
        createdAt:false,
        updatedAt: false
    })
}