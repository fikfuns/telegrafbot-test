const words = require('./words.json')

const lower = words.map(word => word.toLowerCase());

console.log(lower);