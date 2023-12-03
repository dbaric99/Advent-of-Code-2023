const fileReader = require("../helpers/fileReader.js");

const SYMBOL_PATTERN = /\*/;
const NUMBER_PATTERN = /[0-9]/;

const isSpecialSymbol = (symbol) => SYMBOL_PATTERN.test(symbol);
const isNumber = (symbol) => NUMBER_PATTERN.test(symbol);

const NEIGHBOUR_MAPPING = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

const getFullNumberAtPos = (data, x, y) => {
  let number = "";
  let left = x;
  let right = x;

  while (left >= 0 && isNumber(data[y][left])) {
    left--;
  }

  while (right < data[y].length && isNumber(data[y][right])) {
    right++;
  }

  for (let i = left + 1; i < right; i++) {
    number += data[y][i];
  }

  return number;
};

const findAllNumbersNextToCharacter = (data, x, y) => {
  const numbers = new Set();

  for (const direction of NEIGHBOUR_MAPPING) {
    const newX = x + direction.x;
    const newY = y + direction.y;

    if (
      newX >= 0 &&
      newX < data[y].length &&
      newY >= 0 &&
      newY < data.length &&
      isNumber(data[newY][newX])
    ) {
      const fullNumber = getFullNumberAtPos(data, newX, newY);
      numbers.add(parseInt(fullNumber, 10));
    }
  }

  return numbers;
};

var partNumbers = [];

async function main() {
  const data = await fileReader.getLinesFromText("./puzzle.txt");

  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      const currentSymbol = data[y][x];

      if(isSpecialSymbol(currentSymbol)) {
        const numbers = findAllNumbersNextToCharacter(data, x, y);

        if(numbers.size === 2) {
          partNumbers.push(Array.from(numbers).reduce((a, b) => a * b, 1));
        }
      }
    }
  }
  console.log(partNumbers);
  const sum = partNumbers.reduce((total, num) => total + Number(num), 0);
  console.log(sum);
}

main();