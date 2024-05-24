

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

// Define SSL options
const sslOptions = process.env.DB_SSL_MODE === 'require' ? {
    ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: process.env.DB_SSL_CA
    }
} : {};

// Create a Sequelize instance with SSL options
const sequelize = new Sequelize(process.env.DB_DEV_URL, {
    dialect: 'postgres',
    logging: false, // Disable logging; default: console.log
    dialectOptions: {
        ssl: sslOptions.ssl
    },
});

export default sequelize;

