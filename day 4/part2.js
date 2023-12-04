const fileReader = require("../helpers/fileReader.js");

async function main() {
  const data = await fileReader.getLinesFromText("./puzzle.txt");

  const cards = data.map(line => {
    const [cardInfo, numbers] = line.split(': ');
    const [winningNumbersStr, cardNumbersStr] = numbers.split(' | ');

    const readNumbers = (x) => x.split(' ').map(Number).filter(Boolean);
    const winningNumbers = readNumbers(winningNumbersStr);
    const cardNumbers = readNumbers(cardNumbersStr);

    const matches = winningNumbers.filter(number => cardNumbers.includes(number));
    return {
        count: 1,
        matches: matches.length,
    };
  });

  cards.forEach((card, i) => {
    Array.from({ length: card.matches }, (_, j) => {
      if (cards[i + j + 1]) {
        cards[i + j + 1].count += card.count;
      }
    });
  });

  const sum = cards.reduce((total, card) => total + card.count, 0);
  console.log(sum);
}

main();