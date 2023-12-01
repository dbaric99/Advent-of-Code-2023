const FIRST_NUM = /\d/;
const LAST_NUM = /\d(?=[^\d]*$)/;
let sum = 0;

let fileInput = document.getElementById("puzzle-input");
fileInput.addEventListener("change", function () {
  var reader = new FileReader();
  reader.onload = function () {
    sumLineValues(this.result);
  };
  reader.readAsText(this.files[0]);
});

const sumLineValues = (lines) => {
  let nums = handleLines(lines);
  sum += parseInt(nums);
};

const handleLines = (lines) => {
  return lines.split(/\r\n|\n|\r/).map(handleLine);
};

const handleLine = (line) => {
  const firstMatch = line.match(FIRST_NUM);
  const lastMatch = line.match(LAST_NUM);

  if (firstMatch && lastMatch) {
    const first = firstMatch[0];
    const last = lastMatch[0];

    if (first !== undefined && last !== undefined) {
      sum += parseInt(first+last);
      console.log(sum)
    }
  }
};
