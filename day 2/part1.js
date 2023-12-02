import { getLinesFromText } from "../helpers/fileReader.js";

const data = getLinesFromText("./puzzle.txt");

let sum = 0;
const maxcubes = { red: 12, green: 13, blue: 14 };

data.forEach(function (value) {
  let [game, sets] = value.split(":").map((i) => i.trim());
  let gameid = Number(game.match(/(\d+$)/)[0]);
  let set = sets.split(";").map((i) => i.trim());
  let possible = true;

  set.forEach(function (value) {
    let cubes = value.split(",").map((i) => i.trim());
    cubes.forEach(function (cube) {
      let [count, color] = cube.split(" ").map((i) => i.trim());
      if (Number(count) > maxcubes[color]) {
        possible = false;
      }
    });
  });

  if (possible) {
    sum += gameid;
  }
});

console.log(sum);
