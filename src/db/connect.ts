import {Sequelize} from '@sequelize/core';
import config from '@config/database'
import {User} from "@models/user.model";
import {Post} from "@models/post.model";
import {tr} from "@faker-js/faker";

const env = config[process.env.NODE_ENV];

export const sequelize = new Sequelize(env.database, env.username, env.password, {
    logging: console.log,                  // Default, displays the first parameter of the log function call
    // logging: (...msg) => console.log(msg), // Displays all log function call parameters
    // logging: false,                        // Disables logging
    // logging: msg => logger.debug(msg),     // Use custom logger (e.g. Winston or Bunyan), displays the first parameter
    // logging: logger.debug.bind(logger)     // Alternative way to use custom logger, displays all messages

    models: [User, Post],
    // define: {
    //     underscored: true,
    // },
    dialect: env.dialect,
    host: env.host,
    port: env.port,
});

export async function connect() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({force: false});
        console.log('connected to DB')
    } catch (error) {
        console.log('DB connection failed', error)
    }
}
