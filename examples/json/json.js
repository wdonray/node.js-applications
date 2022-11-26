import { writeFileSync, readFileSync } from 'fs';

const book = {
  title: 'A Guide to a Good Life',
  author: 'William B. Irvine'
};

const path = '/1-json.json';
const bookJSON = JSON.stringify(book);

writeFileSync(path, bookJSON);

const dataBuffer = readFileSync(path);
const dataJSON = dataBuffer.toString();
const parsedData = JSON.parse(dataJSON);

console.log(parsedData);