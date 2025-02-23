// this is normal ways to sum from 1 to n using for loop

var sum_to_n_a = function(n) {
    if (n > Number.MAX_SAFE_INTEGER) {
        throw new Error("Input exceeds the maximum safe integer");
    }
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};
// using sum = n * (n + 1 ) / 2
var sum_to_n_b = function(n) {
    if (n > Number.MAX_SAFE_INTEGER) {
        throw new Error("Input exceeds the maximum safe integer");
    }
    return (n * (n + 1)) / 2;
};
// using recursive
var sum_to_n_c = function(n) {
    if (n > Number.MAX_SAFE_INTEGER) {
        throw new Error("Input exceeds the maximum safe integer");
    }
    if (n <= 0) return 0; // base case
    return n + sum_to_n_c(n - 1); // recursive case
};