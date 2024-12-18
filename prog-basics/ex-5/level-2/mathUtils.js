const debug = require('debug')('Shifath:mathUtils');

function add(numbers) {
  debug(`Adding numbers: ${numbers.join(', ')}`);
  const result = numbers.reduce((sum, num) => sum + num, 0);
  debug(`Addition result: ${result}`);
  return result;
}

function multiply(numbers) {
  debug(`Multiplying numbers: ${numbers.join(', ')}`);
  const result = numbers.reduce((product, num) => product * num, 1);
  debug(`Multiplication result: ${result}`);
  return result;
}

function divide(numbers) {
  debug(`Dividing numbers: ${numbers.join(', ')}`);
  if (numbers.length < 2) {
    throw new Error('At least two numbers are required for division');
  }
  
  const [first, ...rest] = numbers;
  const result = rest.reduce((quotient, num) => {
    if (num === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return quotient / num;
  }, first);

  debug(`Division result: ${result}`);
  return result;
}

function subtract(numbers) {
  debug(`Subtracting numbers: ${numbers.join(', ')}`);
  const [first, ...rest] = numbers;
  const result = rest.reduce((difference, num) => difference - num, first);
  debug(`Subtraction result: ${result}`);
  return result;
}

module.exports = { add, multiply, divide, subtract };