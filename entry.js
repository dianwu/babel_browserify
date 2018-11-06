require("@babel/polyfill");

const a = [1,1,2,2,3,43,4,4];
const b =  [...new Set(a)];
console.log(b);