import { json, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';

import { connectToDatabase } from './connection';
import { contactsRouter } from './routes/contacts';

dotenv.config();

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/contacts', contactsRouter);

connectToDatabase();

app.listen(3000);
