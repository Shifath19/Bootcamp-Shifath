const winston = require("winston");
const chalk = require("chalk");

// Initialize logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.printf(({ level, message }) => {
      const color = level === "error" ? chalk.red : chalk.green;
      return color(`${level}: ${message}`);
    })
  ),
  transports: [
    new winston.transports.Console(),
  ],
  exceptionHandlers: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.printf(({ level, message }) =>
          chalk.red(`EXCEPTION: ${message}`)
        )
      ),
    }),

  ],
});

// Arithmetic functions
function add(numbers) {
  const result = numbers.reduce((sum, num) => sum + num, 0);
  //   logger.info(`Adding ${numbers.join(", ")} = ${result}`);
  return result;
}

function multiply(numbers) {
  const result = numbers.reduce((product, num) => product * num, 1);
  //   logger.info(`Multiplying ${numbers.join(", ")} = ${result}`);
  return result;
}

function divide(numbers) {
  if (numbers.includes(0)) {
    logger.error(`Cannot divide ${numbers.join(", ")} - Division by zero`);
    throw new Error("Division by zero is not allowed");
  }
  const result = numbers.reduce((quotient, num) => quotient / num);
  //   logger.info(`Dividing ${numbers.join(", ")} = ${result}`);
  return result;
}

function subtract(numbers) {
  const result = numbers.reduce((difference, num) => difference - num);
  //   logger.info(`Subtracting ${numbers.join(", ")} = ${result}`);
  return result;
}

// Export functions and logger
module.exports = { add, multiply, divide, subtract, logger };
