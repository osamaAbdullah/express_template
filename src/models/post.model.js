import { Model, DataTypes } from 'sequelize';
import { sequelize } from "#db/index";
class Post extends Model {

    static associate({ User }) {
        this.belongsTo(User, { foreignKey: 'userId', as: 'user' })
    }

    toJSON() {
        return { ...this.get() }
    }
}

Post.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: { args: true, msg: "Title must be unique" },
            validate: {
                notNull: { msg: 'Post must have a title' },
                notEmpty: { msg: 'title must not be empty' },
                len: [2, 64]
            },
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'posts',
        modelName: 'Post',
    }
)

export { Post };
