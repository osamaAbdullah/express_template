import { Sequelize } from 'sequelize';
import config from '#config/database'

const env = config[process.env.NODE_ENV];

export const sequelize = new Sequelize(env.database, env.username, env.password, env);

export async function connect() {
    try {
        await sequelize.authenticate();
        console.log('connected to DB')
    } catch (error) {
        console.log('DB connection failed', error)
    }
}
