#!/usr/bin/env node

import chalk from 'chalk';

// Function to validate if a value is a valid number
function isValidNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
}

// Function to display help text
function displayHelp() {
  console.log(chalk.cyan('Math Calculator Usage:'));
  console.log(chalk.green('Basic Usage:'));
  console.log('  node index.js <numbers>        Calculate sum of numbers');
  console.log('  node index.js --multiply <numbers>   Multiply numbers');
  console.log('\n' + chalk.green('Options:'));
  console.log('  --multiply    Multiply numbers instead of adding');
  console.log('  --help        Show this help message');
  console.log('\n' + chalk.yellow('Examples:'));
  console.log('  node index.js 10 20 30');
  console.log('  node  index.js --multiply 2 3 4');
  process.exit(0);
}

// Main function to calculate math operations
function calculateMath() {
  // Remove the first two default arguments (node executable and script path)
  const args = process.argv.slice(2);

  // Check for help flag
  if (args.includes('--help')) {
    displayHelp();
  }

  // Determine operation (default is addition)
  const isMultiply = args.includes('--multiply');
  
  // Filter out the --multiply flag to get only numbers
  const numbers = args
    .filter(arg => arg !== '--multiply')
    .filter(isValidNumber)
    .map(parseFloat);

  // Check if no arguments were provided
  if (numbers.length === 0) {
    console.error(chalk.red('Error: Please provide numeric arguments.'));
    displayHelp();
  }

  // Check if all arguments are valid numbers
  if (numbers.length !== args.filter(arg => arg !== '--multiply').length) {
    console.error(chalk.red('Error: All arguments must be valid numbers.'));
    process.exit(1);
  }

  // Perform calculation based on operation
  let result;
  if (isMultiply) {
    result = numbers.reduce((acc, current) => acc * current, 1);
    console.log(chalk.green(`Multiplication of numbers (${numbers.join(' × ')} = ${result}`));
  } else {
    result = numbers.reduce((acc, current) => acc + current, 0);
    console.log(chalk.green(`Sum of numbers (${numbers.join(' + ')} = ${result}`));
  }

  return result;
}

// Run the calculation
calculateMath();