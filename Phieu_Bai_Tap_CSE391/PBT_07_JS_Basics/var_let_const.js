// Câu A1 - kiểm chứng var / let / const

console.log("=== VAR ===");
console.log(x);
var x = 5;

console.log("=== LET ===");
try {
    console.log(y);
    let y = 10;
} catch (err) {
    console.log("Error:", err.message);
}

console.log("=== CONST ===");
try {
    const z = 15;
    z = 20;
    console.log(z);
} catch (err) {
    console.log("Error:", err.message);
}

console.log("=== CONST ARRAY ===");
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);

console.log("=== BLOCK SCOPE ===");
let a = 1;

{
    let a = 2;
    console.log("Trong block:", a);
}

console.log("Ngoài block:", a);