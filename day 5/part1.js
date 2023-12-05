const fileReader = require("../helpers/fileReader.js");

const getSeeds = (data) => data[0].replace("seeds: ", "").split(" ").map(Number);

const getSplits = (data) => [
  data.indexOf("seed-to-soil map:"),
  data.indexOf("soil-to-fertilizer map:"),
  data.indexOf("fertilizer-to-water map:"),
  data.indexOf("water-to-light map:"),
  data.indexOf("light-to-temperature map:"),
  data.indexOf("temperature-to-humidity map:"),
  data.indexOf("humidity-to-location map:"),
  data.length + 1
];

const getMaps = (data, splits) => splits.map((_, i, arr) => {
  if (i === arr.length - 1) return;
  const lines = data.slice(arr[i] + 1, arr[i + 1] - 1);
  return lines.map(line => line.split(" ").map(Number));
}).filter(Boolean);

const getLocation = (seed, maps) => {
  let loc = seed;
  maps.forEach(map => {
    map.some(([to, from, range]) => {
      if (loc >= from && loc <= from + range - 1) {
        loc = to + (loc - from);
        return true;
      }
      return false;
    });
  });
  return loc;
};

async function main() {
  const data = await fileReader.getLinesFromText("./puzzle.txt");
  data.pop();

  const seeds = getSeeds(data);
  const splits = getSplits(data);
  const maps = getMaps(data, splits);

  const locations = seeds.map(seed => getLocation(seed, maps));

  console.log(locations.join(" "));
  console.log(Math.min(...locations));
}

main();