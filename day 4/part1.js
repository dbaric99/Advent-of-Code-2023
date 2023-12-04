const fileReader = require("../helpers/fileReader.js");

async function main() {
  const data = await fileReader.getLinesFromText("./puzzle.txt");

  const points = data.map(line => {
    const [cardInfo, numbers] = line.split(': ');
    const [winningNumbersStr, cardNumbersStr] = numbers.split(' | ');

    const readNumbers = (x) => x.split(' ').map(Number).filter(Boolean);
    const winningNumbers = readNumbers(winningNumbersStr);
    const cardNumbers = readNumbers(cardNumbersStr);

    const matches = winningNumbers.filter(number => cardNumbers.includes(number));
    return matches.length > 0 ? Math.pow(2, matches.length - 1) : 0;
  });

  const sum = points.reduce((a, b) => a + b, 0);
  console.log(sum);
}

main();