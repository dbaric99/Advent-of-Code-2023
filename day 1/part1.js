import { getLinesFromText } from "../helpers/fileReader.js";

const FIRST_NUM = /\d/;
const LAST_NUM = /\d(?=[^\d]*$)/;
let sum = 0;

const data = getLinesFromText("./puzzle.txt");

data.forEach((line) => {
  const firstMatch = line.match(FIRST_NUM);
  const lastMatch = line.match(LAST_NUM);

  if (firstMatch && lastMatch) {
    const first = firstMatch[0];
    const last = lastMatch[0];

    if (first !== undefined && last !== undefined) {
      sum += parseInt(first + last);
    }
  }
});

console.log(sum);
