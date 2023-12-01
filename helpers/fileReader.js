export function getLinesFromText(fileName) {
  var request = new XMLHttpRequest();
  request.open("GET", fileName, false);
  request.send(null);
  var text = request.responseText;
  var lines = text.split("\n");
  return lines;
}
