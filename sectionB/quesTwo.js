// There is an API that one must call to get data. The trouble is it will not let you cross
// the limit of call - say 15 calls per minute. If you cross the limit, the system penalises
// you by one additional minute of penalty where you can not make any call. Here is
// how the API looks like: function string call_me(string input).
// Propose a solution by which:
// 1. You would be able to use the API within the safe limit.
// 2. What happens if you are supposed to call the API 20 times per minute? Is
// there any way to accomplish this?
// 3. If you were the API designer, what would you do to implement this
// behaviour?

class APICallManager {
  constructor(limit, penaltyDuration) {
    this.limit = limit; // Maximum number of calls allowed per minute
    this.penaltyDuration = penaltyDuration; // Penalty duration in milliseconds
    this.calls = []; // Track timestamps of recent API calls
  }

  call_me(input) {
    const now = Date.now();

    // Remove timestamps older than one minute from the calls array
    this.calls = this.calls.filter((timestamp) => now - timestamp <= 60000);

    if (this.calls.length >= this.limit) {
      // If the call limit is exceeded, impose a penalty
      const penaltyEndTime = this.calls[0] + this.penaltyDuration;
      if (now < penaltyEndTime) {
        const remainingTime = penaltyEndTime - now;
        return `API call limit exceeded. Penalty in effect. Try again in ${remainingTime} milliseconds.`;
      } else {
        // Penalty period over, reset the calls array
        this.calls = [];
      }
    }

    // Make the API call and store the timestamp
    this.calls.push(now);
    // Call the API function with the provided input
    return call_me(input);
  }
}

// Mock API call function
function call_me(input) {
  return `API call successful with input: ${input}`;
}

// Example usage:
const apiManager = new APICallManager(15, 60000); // Limit: 15 calls per minute, Penalty: 60 seconds
for (let i = 0; i < 20; i++) {
  const result = apiManager.call_me(`Input${i}`);
  console.log(result);
}
