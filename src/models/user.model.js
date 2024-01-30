import { Model, DataTypes } from 'sequelize';
import { sequelize } from "#db/index";
import {Post} from "#models/post.model";

class User extends Model {



    toJSON() {
        return { ...this.get() }
    }
}

User.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'User must have a name' },
                notEmpty: { msg: 'Name must not be empty' },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: { args: true, msg: "Email already in use!" },
            validate: {
                notNull: { msg: 'User must have a email' },
                notEmpty: { msg: 'email must not be empty' },
                isEmail: { msg: 'invalid email address' },
            },
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'User must have a role' },
                notEmpty: { msg: 'role must not be empty' },
            },
        },
    },
    {
        sequelize,
        tableName: 'users',
        modelName: 'User',
    }
)

User.hasMany(Post, {foreignKey: 'userId', as: 'posts'})
Post.belongsTo(User, {foreignKey: 'userId', as: 'author'})

export { User };
