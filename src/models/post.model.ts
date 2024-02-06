import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute
} from '@sequelize/core';
import {User} from "@models/user.model";
import {Attribute, BelongsTo} from "@sequelize/core/decorators-legacy";

export class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
    @Attribute({
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    declare id: CreationOptional<number>;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    })
    declare title: string;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: false,
    })
    declare body: string;

    @BelongsTo(() => User, 'userId')
    declare user: NonAttribute<User>;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    })
    declare userId: number;

    toJSON() {
        return {...this.get()}
    }

}
