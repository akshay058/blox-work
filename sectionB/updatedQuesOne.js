// Write a function to parse any valid json string into a corresponding Object, List, or
// Map object. Note that the integer and floating point should be arbitrary precision.

//..............................................................................................
// Corrected issue:

// const JSONbig = require("json-bigint");
// No. The objective is here to write the library json-bigint, not to use it.
//.............................................................................................

function parseJsonWithArbitraryPrecision(jsonString) {
  function parseNumber(str) {
    // Handle integers
    if (/^-?\d+$/.test(str)) {
      return BigInt(str);
    }

    // Handle floating-point numbers
    if (/^-?\d+\.\d+$/.test(str)) {
      return parseFloat(str);
    }

    return str;
  }

  function parseValue(value) {
    if (Array.isArray(value)) {
      // Parse array elements recursively
      return value.map(parseValue);
    } else if (typeof value === "object" && value !== null) {
      // Parse object properties recursively
      const resultObj = {};
      for (const [key, val] of Object.entries(value)) {
        resultObj[key] = parseValue(val);
      }
      return resultObj;
    } else if (typeof value === "string") {
      return parseNumber(value);
    }

    return value;
  }

  try {
    const parsedData = JSON.parse(jsonString);
    return parseValue(parsedData);
  } catch (error) {
    console.error("Error parsing JSON: ", error);
    return null;
  }
}

// Example usage:
const jsonString =
  '{"integer": "123456789012345678901234567890", "float": "123456789012345678901234567890.123456789012345678901234567890", "nested": {"integer": "987654321098765432109876543210", "float": "987654321098765432109876543210.123456789012345678901234567890"}}';
const parsedData = parseJsonWithArbitraryPrecision(jsonString);

console.log(parsedData);
