const fileReader = require("../helpers/fileReader.js");

const SYMBOL_PATTERN = /[^A-Za-z0-9.]/;
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

var partNumbers = [];

async function partOne() {
  const data = await fileReader.getLinesFromText("./puzzle.txt");

  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      const currentSymbol = data[y][x];

      if (isNumber(currentSymbol)) {
        const fullNumber = getFullNumberAtPos(data, x, y);
        let hasSpecialSymbol = false;

        for (let i = 0; i < fullNumber.length; i++) {
          for (const direction of NEIGHBOUR_MAPPING) {
            const newX = x + i + direction.x;
            const newY = y + direction.y;

            if (
              newX >= 0 &&
              newX < data[y].length &&
              newY >= 0 &&
              newY < data.length
            ) {
              const neighbourSymbol = data[newY][newX];

              if (isSpecialSymbol(neighbourSymbol)) {
                hasSpecialSymbol = true;
                break;
              }
            }
          }

          if (hasSpecialSymbol) {
            break;
          }
        }

        if (hasSpecialSymbol) {
          partNumbers.push(fullNumber);
        }

        x += fullNumber.length - 1;
      }
    }
  }
  console.log(partNumbers);
  const sum = partNumbers.reduce((total, num) => total + Number(num), 0);
  console.log(sum);
}

partOne();
