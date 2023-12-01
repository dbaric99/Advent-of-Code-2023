import { getLinesFromText } from "../helpers/fileReader.js";

const PATTERN = /((?=(one|two|three|four|five|six|seven|eight|nine))|\d)/g;

const data = getLinesFromText("./puzzle.txt");

const digits = {
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9
};

const matchOverlaps = (x) => {
  const matches = [...x.matchAll(PATTERN)];
  return matches.map(([_, number, digit]) => Number(digits[digit] ?? number));
};

const calculateSum = (numbers) => {
  return numbers[0] * 10 + numbers[numbers.length - 1];
};

const sum = data
  .map(matchOverlaps)
  .map(calculateSum)
  .reduce((a, b) => a + b, 0);

console.log(sum);