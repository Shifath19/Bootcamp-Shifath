require('dotenv').config();
const winston = require('winston');
const debug = require('debug')('Shifath:envConfig');
const chalk = require('chalk');

// Import MathUtils
const { add, multiply, divide, subtract } = require('./mathUtils');

// Enhanced Logger with more detailed formatting
const createLogger = () => {
  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.printf(({ level, message, timestamp, ...metadata }) => {
        let msg = `${timestamp} [${level.toUpperCase()}]: ${message} `;
        if (Object.keys(metadata).length > 0) {
          msg += JSON.stringify(metadata);
        }
        return msg;
      })
    ),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      }),
      new winston.transports.File({ 
        filename: 'logs/app.log', 
        level: 'info' 
      }),
      new winston.transports.File({ 
        filename: 'logs/error.log', 
        level: 'error' 
      })
    ]
  });
};

// Configuration Management Class
class ConfigManager {
  constructor(logger) {
    this.logger = logger;
    this.config = this.loadConfiguration();
  }

  // Load and validate configuration with fallback values
  loadConfiguration() {
    const config = {
      // Math Operation Defaults
      DEFAULT_OPERATION: process.env.DEFAULT_OPERATION || 'add',
      DEFAULT_NUMBERS: this.parseDefaultNumbers(
        process.env.DEFAULT_NUMBERS || '10,20,30'
      ),
      
      // Logging Configurations
      LOG_LEVEL: process.env.LOG_LEVEL || 'info',
      
      // Math Calculation Limits
      MAX_NUMBERS: this.parsePositiveInteger(
        process.env.MAX_NUMBERS, 
        5, 
        'MAX_NUMBERS'
      ),
      
      // Calculation Precision
      DECIMAL_PLACES: this.parsePositiveInteger(
        process.env.DECIMAL_PLACES, 
        2, 
        'DECIMAL_PLACES'
      )
    };

    // Log warnings for missing or default values
    this.logConfigurationWarnings(config);

    return config;
  }

  // Parse default numbers from environment variable
  parseDefaultNumbers(numberString) {
    try {
      const numbers = numberString.split(',')
        .map(num => parseFloat(num.trim()))
        .filter(num => !isNaN(num));
      
      if (numbers.length === 0) {
        this.logger.warn('No valid numbers found in DEFAULT_NUMBERS. Using fallback.');
        return [10, 20, 30];
      }
      
      return numbers;
    } catch (error) {
      this.logger.warn('Error parsing DEFAULT_NUMBERS. Using fallback.', { error: error.message });
      return [10, 20, 30];
    }
  }

  // Parse and validate positive integers with fallback
  parsePositiveInteger(value, fallbackValue, variableName) {
    const parsed = parseInt(value, 10);
    
    if (isNaN(parsed) || parsed <= 0) {
      this.logger.warn(`Invalid or missing ${variableName}. Using fallback value.`, {
        providedValue: value,
        fallbackValue
      });
      return fallbackValue;
    }
    
    return parsed;
  }

  // Log warnings about configuration
  logConfigurationWarnings(config) {
    debug('Loaded Configuration');
    this.logger.info('Application Configuration', {
      defaultOperation: config.DEFAULT_OPERATION,
      defaultNumbers: config.DEFAULT_NUMBERS,
      logLevel: config.LOG_LEVEL,
      maxNumbers: config.MAX_NUMBERS,
      decimalPlaces: config.DECIMAL_PLACES
    });
  }

  // Perform math operation based on configuration
  performMathOperation() {
    const { DEFAULT_OPERATION, DEFAULT_NUMBERS, MAX_NUMBERS, DECIMAL_PLACES } = this.config;
    
    // Limit numbers if exceeding MAX_NUMBERS
    const numbers = DEFAULT_NUMBERS.slice(0, MAX_NUMBERS);
    
    debug(`Performing ${DEFAULT_OPERATION} on numbers: ${numbers.join(', ')}`);
    
    let result;
    switch (DEFAULT_OPERATION) {
      case 'add':
        result = add(numbers);
        break;
      case 'multiply':
        result = multiply(numbers);
        break;
      case 'divide':
        result = divide(numbers);
        break;
      case 'subtract':
        result = subtract(numbers);
        break;
      default:
        this.logger.warn(`Unknown operation: ${DEFAULT_OPERATION}. Defaulting to addition.`);
        result = add(numbers);
    }

    console.log(chalk.green(`Result of ${DEFAULT_OPERATION}: ${result.toFixed(DECIMAL_PLACES)}`));
    this.logger.info(`Math Operation: ${DEFAULT_OPERATION}`, { 
      numbers, 
      result: result.toFixed(DECIMAL_PLACES) 
    });

    return result;
  }
}

// Main function to run the application
function main() {
  const logger = createLogger();
  
  try {
    const configManager = new ConfigManager(logger);
    configManager.performMathOperation();
  } catch (error) {
    logger.error('Application failed to start', { error: error.message });
    console.error(chalk.red('Startup Error:', error.message));
  }
}

// Run the application
main();

module.exports = { ConfigManager, createLogger };