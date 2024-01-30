import app from "#root/app";
import {connect} from "#db/index";

app.listen(
    process.env.PORT,
    () => {
        console.log(
            '\x1b[36m',
            `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${process.env.PORT}`
        )
        connect();
    }
);

process.on('unhandledRejection', (error, promise) => {
    console.log('\x1b[1m', `Error: ${error.message}`);
    // Close server & exit process
    // app.close(() => process.exit(1));
});
