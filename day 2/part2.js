import { getLinesFromText } from "../helpers/fileReader.js";

const data = getLinesFromText("./puzzle.txt");

let sum = 0;

for (const value of data) {
  const sets = value.split(':')[1].trim().split(';');
  const cubeMinimum = { 'red': 0, 'green': 0, 'blue': 0 };

  for (const set of sets) {
    const cubes = set.split(",");
    for (const cube of cubes) {
      const [count, color] = cube.trim().split(' ');
      cubeMinimum[color] = Math.max(cubeMinimum[color], Number(count));
    }
  }

  let product = 1;
  for (const count of Object.values(cubeMinimum)) {
    product *= count;
  }

  sum += product;
}

console.log(sum);