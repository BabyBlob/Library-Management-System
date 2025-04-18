import express from "express";
import { Port, MongoDbUrl } from "./config.js";
import mongoose from "mongoose";
import booksRoute from '../Routes/booksRoute.js';
import loginsRoute from '../Routes/LoginsRoute.js';
import BookLendingRoute from '../Routes/BookLendingRoute.js'
import PostRoute from '../Routes/PostRoute.js';

const app = express();
import cors from 'cors';

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome Blobby');
});

app.use('/Book', booksRoute);
app.use('/', loginsRoute);
app.use('/Book', BookLendingRoute);
app.use('/posts', PostRoute);
app.use('/users', loginsRoute);

mongoose
    .connect(MongoDbUrl)
    .then(() => {
        console.log('MongoDB Library Management System Database has successfully been connected.');
        app.listen(Port, ()=> {
            console.log(`App is listening to port: ${Port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

    