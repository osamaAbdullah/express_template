export default {
    local: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DRIVER,
        dialectOptions: {
            bigNumberStrings: true
        }
    },
    test: {
        username: process.env.CI_DB_USERNAME,
        password: process.env.CI_DB_PASSWORD,
        database: process.env.CI_DB_NAME,
        host: process.env.CI_DB_HOSTNAME,
        port: process.env.CI_DB_PORT,
        dialect: process.env.CI_DB_DRIVER,
        dialectOptions: {
            bigNumberStrings: true
        }
    },
    // production: {
    //     username: process.env.PROD_DB_USERNAME,
    //     password: process.env.PROD_DB_PASSWORD,
    //     database: process.env.PROD_DB_NAME,
    //     host: process.env.PROD_DB_HOSTNAME,
    //     port: process.env.PROD_DB_PORT,
    //     dialect: 'mysql',
    //     dialectOptions: {
    //         bigNumberStrings: true,
    //         ssl: {
    //             ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
    //         }
    //     }
    // }
};
