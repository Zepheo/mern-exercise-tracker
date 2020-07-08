const express = require('express');
const cors = require('cors');

const initMongoose = require('./db/index');
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const mongoURL = process.env.ATLAS_URL;

app.use(cors());
app.use(express.json());

initMongoose(mongoURL);

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => console.log(`Server is listening on port: ${port}`));
