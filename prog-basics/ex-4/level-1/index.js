const { add, multiply, divide, subtract } = require("./mathUtils");
const chalk = require("chalk");
const debug = require("debug")("Shifath:index");
const winston = require('winston');

// Logger setup (from previous exercise)
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({ 
      filename: 'logs/info.log', 
      level: 'info' 
    }),
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    })
  ]
});

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error(
    "Error: Invalid number of arguments. There must be at least 2 arguments to complete the operation"
  );
  process.exit(1);
}

const operation = args[0];
const numbers = args.slice(1).map((arg) => {
  const num = parseFloat(arg);
  if (isNaN(num)) {
    console.error(`Error: "${arg}" is not a valid number.`);
    process.exit(1);
  }
  return num;
});

logger.info("Starting the application...");
debug("App started");

try {
  let result;
  if (operation === "--add") {
    result = add(numbers);
    console.log(`Sum: ${result}`);
  } else if (operation === "--multiply") {
    result = multiply(numbers);
    console.log(`Product: ${result}`);
  } else if (operation === "--divide") {
    result = divide(numbers);
    console.log(`Quotient: ${result}`);
  } else if (operation === "--subtract") {
    result = subtract(numbers);
    console.log(`Difference: ${result}`);
  } else {
    console.error(`Error: Invalid operation "${operation}".`);
    process.exit(1);
  }

  logger.info(chalk.green("Operation completed successfully."));
} catch (error) {
  logger.error(chalk.red("Operation failed due to an error"));
}

debug("App finished");

module.exports = { add, multiply, divide, subtract, logger };