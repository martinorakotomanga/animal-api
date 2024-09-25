import { Sequelize } from "sequelize"

export default (sequelize: Sequelize, DataTypes: any) => {
    return sequelize.define('animal',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Le nom de l\'animal ne peut pas être vide !' },
                notNull: { msg: 'Le nom de l\'animal est une propriété requise !'},
                is: { 
                    args: '^[a-zA-Z- êàéèëç]{1,25}$',
                    msg: 'Le nom de l\'animal ne doit contenir que des lettres !'
                }
            }
        },  
        scientific_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: { name: 'nom_scientifique', msg: 'Le nom scientifique de l\'animal existe déjà, il doit être unique !'},
            validate: {
                notEmpty: { msg: 'Le nom scientific de l\'animal ne peut pas être vide !' },
                notNull: { msg: 'Le nom scientific de l\'animal est une propriété requise !'},
                is: { 
                    args: '^[a-zA-Z- êàéèëç]{1,50}$',
                    msg: 'Le nom scientific de l\'animal ne doit contenir que des lettres !'
                }
            }
        },
        life_style: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'La mode de vie de l\'animal ne peut pas être vide !' },
                notNull: { msg: 'La mode de vie de l\'animal est une propriété requise !'},
                is: {
                    args: '^[a-zA-Z- ]+$',
                    msg: 'La mode de vie de l\'animal ne doit contenir que des lettres !'
                }
            }
        },
        eating_pattern: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'La regime alimentaire de l\'animal ne peut pas être vide !' },
                notNull: { msg: 'La regime alimentaire de l\'animal est une propriété requise !'},
                is: {
                    args: '^[a-zA-Z- ]+$',
                    msg: 'La regime alimentaire de l\'animal ne doit contenir que des lettres !'
                }
            }
        },
        mode_of_reproduction: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'La mode de reproduction de l\'animal ne peut pas être vide !' },
                notNull: { msg: 'La mode de reproduction de l\'animal est une propriété requise !'},
                is: {
                    args: '^[a-zA-Z- ]+$',
                    msg: 'La mode de reproduction de l\'animal ne doit contenir que des lettres !'
                }
            }
        },
        level_of_development: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Le niveaux de développement de l\'animal ne peut pas être vide !' },
                notNull: { msg: 'Le niveaux de développement de l\'animal est une propriété requise !'},
                is: {
                    args: '^[a-zA-Z- ]+$',
                    msg: 'Le niveaux de développement de l\'animal ne doit contenir que des lettres !'
                }
            }
        },
        colors: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Le tableau des couleurs de l\'animal est une propriété requise !'},
                isValidColors(value) {
                    if(!value) {
                        throw new Error('Un animal doit avoir une couleur minimum');
                    }
                }
            },
            get() {
                if(this.getDataValue('colors')) {
                    return this.getDataValue('colors').split(',');
                }
            },
            set(colors: string[]) {
                if(JSON.stringify(colors)[0] == '[') {
                    this.setDataValue('colors', colors.join());
                }
            }
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Le poids de l\'animal ne peut pas être vide !' },
                notNull: { msg: 'Le poids de l\'animal est une propriété requise !'},
                isFloat: { msg: 'Le poids de l\'animal ne doit contenir que des chiffres !'}
            },
            set(weight: any) {
                this.setDataValue('weight', parseFloat(weight));
            }
        },
        height: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'L\'hauteur de l\'animal ne peut pas être vide !' },
                notNull: { msg: 'L\'hauteur de l\'animal est une propriété requise !'},
                isFloat: { msg: 'L\'hauteur de l\'animal ne doit contenir que des chiffres !'}
            },
            set(height: any) {
                this.setDataValue('height', parseFloat(height));
            }
        },
        length: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'La longueur de l\'animal ne peut pas être vide !' },
                notNull: { msg: 'La longueur de l\'animal est une propriété requise !'},
                isFloat: { msg: 'La longueur de l\'animal ne doit contenir que des chiffres !'}
            },
            set(length: any) {
                this.setDataValue('length', parseFloat(length));
            }
        },
        width: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'La largeur de l\'animal ne peut pas être vide !' },
                notNull: { msg: 'La largeur de l\'animal est une propriété requise !'},
                isFloat: { msg: 'La largeur de l\'animal ne doit contenir que des chiffres !'}
            },
            set(width: any) {
                this.setDataValue('width', parseFloat(width));
            }
        },
        specific_caracters: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'La caractère specifique de l\'animal ne peut pas être vide !' },
                notNull: { msg: 'La caractère specifique de l\'animal est une propriété requise !'},
                is: {
                    args: '^[a-zA-Z- ]+$',
                    msg: 'La caractère specifique de l\'animal ne doit contenir que des lettres !'
                }
            }
        },
        life: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'La vie de l\'animal ne peut pas être vide !' },
                notNull: { msg: 'La vie de l\'animal est une propriété requise !'},
                isValidLife(value) {
                    if(value!=false && value!=true) {
                        throw new Error('La vie de l\'animal ne peut présentée que par un \'boolean\'');
                    }
                }
            }
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated'
    });
}