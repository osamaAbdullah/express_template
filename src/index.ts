import app from "@/app";
import {connect} from "@db/connect";

app.listen(
    process.env.PORT,
    () => {
        console.info('\x1b[36m', `=======================================`);
        console.info('\x1b[36m', `======= ENV: ${process.env.NODE_ENV} ==============`);
        console.info('\x1b[36m', `==🚀🚀🚀 http://localhost:${process.env.PORT} 🚀🚀🚀==`);
        console.info('\x1b[36m', `=======================================`);
        connect();

    }
);

process.on('unhandledRejection', (error, promise) => {
    console.log('\x1b[1m', `Error: ${error}`, error);
    // Close server & exit process
    // app.close(() => process.exit(1));
});
