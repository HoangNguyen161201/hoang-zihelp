import dotenv from 'dotenv';
import express from 'express';
import AppDataSource from './common/config/dbConnect';
import mainRoute from './common/config/mainRoute';
import ApplyMiddleware from './common/middlewares';
import handleError from './common/middlewares/handleError.middleware';

const runApp = async () => {
    // config dotenv
    dotenv.config();

    // connect db
    AppDataSource.initialize()

    const app = express();

    // use middleware
    ApplyMiddleware(app)

    // apply route
    mainRoute(app)

    handleError(app)

    // get port
    const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : process.env.PORT_DEV;

    // listen with port
    app.listen(PORT, () => {
        console.log(`✌ App listening on port ${PORT} ✌`)
    })
}

runApp()