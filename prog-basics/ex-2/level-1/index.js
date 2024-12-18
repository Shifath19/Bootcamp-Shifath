#!/usr/bin/env node

// Function to validate if a value is a valid number
function isValidNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
}

// Main function to calculate sum of numbers
function calculateSum() {
  // Remove the first two default arguments (node executable and script path)
  const args = process.argv.slice(2);

  // Check if no arguments were provided
  if (args.length === 0) {
    console.error('Error: Please provide numeric arguments.');
    console.error('Usage: node index.js <number1> <number2> ...');
    process.exit(1);
  }

  // Filter and validate numeric arguments
  const numbers = args.filter(isValidNumber).map(parseFloat);

  // Check if all arguments are valid numbers
  if (numbers.length !== args.length) {
    console.error('Error: All arguments must be valid numbers.');
    console.error('Invalid inputs detected.');
    process.exit(1);
  }

  // Calculate the sum
  const sum = numbers.reduce((acc, current) => acc + current, 0);

  // Output the result
  console.log(`Sum of numbers (${numbers.join(' + ')} = ${sum}`);
  return sum;
}

// Run the sum calculation
calculateSum();