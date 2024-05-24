import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Define the Contact model
const Contact = sequelize.define('Contact', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    linkedId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    linkPrecedence: {
        type: DataTypes.ENUM('secondary', 'primary'),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true, // this will add createdAt and updatedAt fields automatically
    paranoid: true // this will add deletedAt field and use it instead of actually deleting the record
});

export default Contact;
