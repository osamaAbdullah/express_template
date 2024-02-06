import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute
} from '@sequelize/core';

import {Post} from "@models/post.model";
import {Attribute, HasMany} from "@sequelize/core/decorators-legacy";


export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    @Attribute({
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    declare id: CreationOptional<number>;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: false
    })
    declare name: string;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    })
    declare email: string;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: false
    })
    declare role: string;

    @HasMany(() => Post, 'userId')
    declare posts?: NonAttribute<Post[]>;

    toJSON() {
        return {...this.get()}
    }

}
