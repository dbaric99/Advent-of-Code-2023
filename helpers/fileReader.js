const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function getLinesFromText(filePath) {
  const data = await readFile(filePath, 'utf8');
  return data.split('\n');
}

module.exports = { getLinesFromText };