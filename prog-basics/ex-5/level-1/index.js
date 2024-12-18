require('dotenv').config();
const express = require('express');
const winston = require('winston');

// Create a logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

// Create Express app
const app = express();

// Get environment variables with defaults
const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const APP_NAME = process.env.APP_NAME || 'DefaultApp';

// Basic route
app.get('/', (req, res) => {
  logger.info(`Request received on ${APP_NAME} server`);
  res.json({
    message: `Welcome to ${APP_NAME}`,
    configuration: {
      port: PORT,
      dbHost: DB_HOST,
      dbPort: DB_PORT
    }
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`${APP_NAME} running on port ${PORT}`);
  logger.info(`Connected to database at ${DB_HOST}:${DB_PORT}`);
});