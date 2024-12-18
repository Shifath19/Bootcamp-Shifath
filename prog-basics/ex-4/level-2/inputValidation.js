const debug = require('debug')('Shifath:inputValidator');

class InputValidator {
  static validateNumbers(args) {
    debug('Starting number validation');
    
    if (args.length < 2) {
      debug('Validation failed: Insufficient arguments');
      throw new Error('Invalid number of arguments. At least 2 arguments are required.');
    }

    const numbers = args.map((arg) => {
      const num = parseFloat(arg);
      
      if (isNaN(num)) {
        debug(`Validation failed: Invalid number - ${arg}`);
        throw new Error(`"${arg}" is not a valid number.`);
      }
      
      return num;
    });

    debug('Validation successful');
    return numbers;
  }

  static validateOperation(operation) {
    debug(`Validating operation: ${operation}`);
    
    const validOperations = [
      '--add', 
      '--multiply', 
      '--divide', 
      '--subtract',
      '--power',
      '--factorial',
      '--sqrt',
      '--percentage'
    ];

    if (!validOperations.includes(operation)) {
      debug(`Validation failed: Invalid operation - ${operation}`);
      throw new Error(`Invalid operation "${operation}".`);
    }

    debug('Operation validation successful');
    return operation;
  }
}

module.exports = InputValidator;