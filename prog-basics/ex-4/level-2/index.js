const { add, multiply, divide, subtract } = require("./mathUtils");
const AdvancedMathOperations = require('./AdvancedMathOperations');
const InputValidator = require('./inputValidation');
const chalk = require("chalk");
const debug = require("debug")("Shifath:index");
const winston = require('winston');

// Logger setup (consistent with previous implementation)
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

// Function to display usage instructions
function displayUsage() {
  console.log(chalk.yellow('Usage: node index.js <operation> <numbers>\n'));
  console.log(chalk.green('Available operations:'));
  console.log('  --add         : Add numbers');
  console.log('  --multiply    : Multiply numbers');
  console.log('  --divide      : Divide numbers');
  console.log('  --subtract    : Subtract numbers');
  console.log('  --power       : Calculate power (base, exponent)');
  console.log('  --factorial   : Calculate factorial of a number');
  console.log('  --sqrt        : Calculate square root');
  console.log('  --percentage  : Calculate percentage (value, total)\n');
  
  console.log(chalk.yellow('Examples:'));
  console.log('  node index.js --add 10 20 30');
  console.log('  node index.js --power 2 3');
  console.log('  node index.js --percentage 25 200');
}

const args = process.argv.slice(2);

// If no arguments are provided, show usage
if (args.length === 0) {
  displayUsage();
  process.exit(0);
}

try {
  // Validate operation and arguments first
  const operation = InputValidator.validateOperation(args[0]);
  const numbers = InputValidator.validateNumbers(args.slice(1));

  logger.info("Starting the application...");
  debug("App started");

  let result;
  switch (operation) {
    case '--add':
      result = add(numbers);
      console.log(`Sum: ${result}`);
      break;
    case '--multiply':
      result = multiply(numbers);
      console.log(`Product: ${result}`);
      break;
    case '--divide':
      result = divide(numbers);
      console.log(`Quotient: ${result}`);
      break;
    case '--subtract':
      result = subtract(numbers);
      console.log(`Difference: ${result}`);
      break;
    case '--power':
      result = AdvancedMathOperations.power(numbers[0], numbers[1]);
      console.log(`Power: ${result}`);
      break;
    case '--factorial':
      result = AdvancedMathOperations.factorial(numbers[0]);
      console.log(`Factorial: ${result}`);
      break;
    case '--sqrt':
      result = AdvancedMathOperations.sqrt(numbers[0]);
      console.log(`Square Root: ${result}`);
      break;
    case '--percentage':
      result = AdvancedMathOperations.percentage(numbers[0], numbers[1]);
      console.log(`Percentage: ${result.toFixed(2)}%`);
      break;
  }

  logger.info(chalk.green("Operation completed successfully."));
} catch (error) {
  logger.error(chalk.red(`Operation failed: ${error.message}`));
  console.error(error.message);
  
  // Display usage instructions if there's an error
  console.log('\n');
  displayUsage();
  process.exit(1);
}

debug("App finished");

module.exports = { 
  add, 
  multiply, 
  divide, 
  subtract, 
  logger,
  AdvancedMathOperations
};