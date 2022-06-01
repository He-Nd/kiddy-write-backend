require('dotenv').config()
const express = require('express');
var cors = require('cors')
const usersRouter = require('./routes/users');
const app = express();
const { configureDb, ConnectToDb, connectToDb } = require('./database/dbManager');
const { handleAuthError } = require('./errorMiddleware');

configureDb();
connectToDb();

app.use(cors())

app.use(express.json());

app.get('/', (req, res, next) => res.send('hello world'));

app.use('/users', usersRouter);

app.use(handleAuthError);

app.listen(process.env.PORT, () => console.log(`server has started on ${process.env.PORT}`));