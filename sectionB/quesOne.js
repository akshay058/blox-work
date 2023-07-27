// Write a function to parse any valid json string into a corresponding Object, List, or
// Map object. Note that the integer and floating point should be arbitrary precision.

const JSONbig = require("json-bigint");
const BigNumber = require("bignumber.js");

function parseJsonWithArbitraryPrecision(jsonString) {
  function parseValue(value) {
    if (typeof value === "bigint") {
      // Convert BigInt to a regular number
      return Number(value);
    } else if (BigNumber.isBigNumber(value)) {
      // Convert BigNumber to a regular number
      return value.toString();
    } else if (Array.isArray(value)) {
      // Parse array elements recursively
      return value.map(parseValue);
    } else if (typeof value === "object" && value !== null) {
      // Parse object properties recursively
      const resultObj = {};
      for (const [key, val] of Object.entries(value)) {
        resultObj[key] = parseValue(val);
      }
      return resultObj;
    }
    return value;
  }

  try {
    const parsedData = JSONbig.parse(jsonString);
    return parseValue(parsedData);
  } catch (error) {
    console.error("Error parsing JSON: ", error);
    return null;
  }
}

// Example usage:
const jsonString =
  '{"integer": 123456789012345678901234567890, "float": 123456789012345678901234567890.123456789012345678901234567890, "nested": {"integer": 987654321098765432109876543210, "float": 987654321098765432109876543210.123456789012345678901234567890}}';
const parsedData = parseJsonWithArbitraryPrecision(jsonString);

console.log(parsedData);
