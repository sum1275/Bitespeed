import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import sequelize from './config/database.js'
import contactRoutes from './routes/contactRoutes.js'
dotenv.config();
const app = express();
const port = process.env.DEV_PORT || 3000;
app.use(bodyParser.json());
app.use('/api', contactRoutes);
sequelize.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });