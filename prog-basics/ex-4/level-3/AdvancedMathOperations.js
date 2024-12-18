const debug = require('debug')('Shifath:advancedMath');

class AdvancedMathOperations {
  static power(base, exponent) {
    debug(`Calculating power: ${base}^${exponent}`);
    const result = Math.pow(base, exponent);
    debug(`Power result: ${result}`);
    return result;
  }


  static sqrt(num) {
    debug(`Calculating square root of: ${num}`);
    if (num < 0) {
      throw new Error('Square root is not defined for negative numbers');
    }
    
    const result = Math.sqrt(num);
    debug(`Square root result: ${result}`);
    return result;
  }

  static percentage(value, total) {
    debug(`Calculating percentage: ${value} of ${total}`);
    const result = (value / total) * 100;
    debug(`Percentage result: ${result.toFixed(2)}%`);
    return result;
  }
}

module.exports = AdvancedMathOperations;