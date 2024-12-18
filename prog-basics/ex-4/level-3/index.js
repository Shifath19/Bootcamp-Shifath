const readline = require('readline');
const debug = require('debug')('Shifath:calculator');
const chalk = require('chalk');
const winston = require('winston');

// Advanced Math Operations
const AdvancedMathOperations = require('./advancedMathOperations');
const { add, multiply, divide, subtract } = require('./mathUtils');

// Create a combined logger with enhanced formatting
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.printf(({ level, message, timestamp, ...metadata }) => {
      let msg = `${timestamp} [${level}]: ${message} `;
      if (Object.keys(metadata).length > 0) {
        msg += JSON.stringify(metadata);
      }
      return msg;
    })
  ),
  transports: [
    // Console transport with colors
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    // File transport for info logs
    new winston.transports.File({ 
      filename: 'logs/info.log', 
      level: 'info' 
    }),
    // Separate file for error logs
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    })
  ]
});

class InteractiveMathCalculator {
  constructor() {
    debug('Initializing Interactive Math Calculator');
    
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    this.operations = {
      '--add': this.performAddition.bind(this),
      '--multiply': this.performMultiplication.bind(this),
      '--divide': this.performDivision.bind(this),
      '--subtract': this.performSubtraction.bind(this),
      '--power': this.performPower.bind(this),
      '--factorial': this.performFactorial.bind(this),
      '--sqrt': this.performSquareRoot.bind(this),
      '--percentage': this.performPercentage.bind(this)
    };
  }

  start() {
    debug('Starting interactive calculator');
    logger.info('Interactive Math Calculator Started');
    this.showMenu();
  }

  showMenu() {
    debug('Displaying main menu');
    console.log(chalk.yellow('\n===== Interactive Math Calculator ====='));
    console.log(chalk.green('Available Operations:'));
    Object.keys(this.operations).forEach(op => {
      console.log(chalk.blue(`  ${op}`));
    });
    console.log(chalk.red('  --exit (to quit)'));
    
    this.prompt();
  }

  prompt() {
    this.rl.question(chalk.cyan('\nEnter operation and numbers (space-separated): '), (input) => {
      debug(`User input received: ${input}`);
      logger.info(`User input: ${input}`);

      // Exit condition
      if (input.trim() === '--exit') {
        this.exit();
        return;
      }

      // Parse input
      const args = input.split(' ');
      
      try {
        this.processOperation(args);
      } catch (error) {
        logger.error(`Operation error: ${error.message}`);
        console.error(chalk.red(`Error: ${error.message}`));
      }

      // Continue prompting
      this.prompt();
    });
  }

  processOperation(args) {
    debug(`Processing operation: ${args}`);
    
    if (args.length < 2) {
      throw new Error('Insufficient arguments. Please provide an operation and numbers.');
    }

    const operation = args[0];
    const numbers = args.slice(1).map(num => {
      const parsed = parseFloat(num);
      if (isNaN(parsed)) {
        throw new Error(`Invalid number: ${num}`);
      }
      return parsed;
    });

    if (!this.operations[operation]) {
      throw new Error(`Invalid operation: ${operation}`);
    }

    // Execute the operation
    this.operations[operation](numbers);
  }

  performAddition(numbers) {
    debug(`Addition operation: ${numbers.join(' + ')}`);
    const result = add(numbers);
    console.log(chalk.green(`Sum: ${result}`));
    logger.info(`Addition: ${numbers.join(' + ')} = ${result}`);
  }

  performMultiplication(numbers) {
    debug(`Multiplication operation: ${numbers.join(' * ')}`);
    const result = multiply(numbers);
    console.log(chalk.green(`Product: ${result}`));
    logger.info(`Multiplication: ${numbers.join(' * ')} = ${result}`);
  }

  performDivision(numbers) {
    debug(`Division operation: ${numbers.join(' / ')}`);
    const result = divide(numbers);
    console.log(chalk.green(`Quotient: ${result}`));
    logger.info(`Division: ${numbers.join(' / ')} = ${result}`);
  }

  performSubtraction(numbers) {
    debug(`Subtraction operation: ${numbers.join(' - ')}`);
    const result = subtract(numbers);
    console.log(chalk.green(`Difference: ${result}`));
    logger.info(`Subtraction: ${numbers.join(' - ')} = ${result}`);
  }

  performPower(numbers) {
    debug(`Power operation: ${numbers[0]}^${numbers[1]}`);
    const result = AdvancedMathOperations.power(numbers[0], numbers[1]);
    console.log(chalk.green(`Power: ${result}`));
    logger.info(`Power: ${numbers[0]}^${numbers[1]} = ${result}`);
  }

  performFactorial(numbers) {
    debug(`Factorial operation: ${numbers[0]}!`);
    const result = AdvancedMathOperations.factorial(numbers[0]);
    console.log(chalk.green(`Factorial: ${result}`));
    logger.info(`Factorial: ${numbers[0]}! = ${result}`);
  }

  performSquareRoot(numbers) {
    debug(`Square Root operation: √${numbers[0]}`);
    const result = AdvancedMathOperations.sqrt(numbers[0]);
    console.log(chalk.green(`Square Root: ${result}`));
    logger.info(`Square Root: √${numbers[0]} = ${result}`);
  }

  performPercentage(numbers) {
    debug(`Percentage operation: ${numbers[0]} of ${numbers[1]}`);
    const result = AdvancedMathOperations.percentage(numbers[0], numbers[1]);
    console.log(chalk.green(`Percentage: ${result.toFixed(2)}%`));
    logger.info(`Percentage: ${numbers[0]} of ${numbers[1]} = ${result.toFixed(2)}%`);
  }

  exit() {
    debug('Exiting calculator');
    logger.info('Interactive Math Calculator Closed');
    console.log(chalk.yellow('\nThank you for using the Interactive Math Calculator!'));
    this.rl.close();
  }
}

// Main execution
function main() {
  debug('Initializing main function');
  const calculator = new InteractiveMathCalculator();
  calculator.start();
}

// Only run main if this file is being run directly
if (require.main === module) {
  main();
}

module.exports = InteractiveMathCalculator;