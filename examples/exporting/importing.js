import { add, value, getRandomInt } from './exporting.js';

const randomValue = getRandomInt(1, 100);
const sum = add(value, randomValue);

console.log(sum);