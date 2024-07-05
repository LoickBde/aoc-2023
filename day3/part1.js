import { fileURLToPath } from "url";
import { dirname } from "path";
import { readInput } from "../common/readInput.js";


const checkIfaSymbolIsAdjacent = (numberCoordinates, symbolsCoordinates) => {
  const { row, col } = numberCoordinates;
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 0], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  return symbolsCoordinates.some(({ row: symbRow, col: symbCol }) =>
    directions.some(([dRow, dCol]) =>
      row + dRow === symbRow && col + dCol === symbCol
    )
  );
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INPUT_FILE_NAME = "input.txt";
const INPUT_FILE_PATH = `${__dirname}/${INPUT_FILE_NAME}`;

const rawInput = await readInput(INPUT_FILE_PATH);

const symbols = /[#\$%&\*\+\-\/=@]/g;

let symbolsCoordinates = []
rawInput.forEach((line, row) => {
  let match;

  // succesive matches - from MDN example https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
  while ((match = symbols.exec(line)) !== null) {
    symbolsCoordinates.push({ row, col: match.index });
  }
})

let foundNumbers = []
rawInput.forEach((line, row) => {
  let number = '';
  let isValidNumber = false;
  [...line].forEach((char, col) => {
    if (char >= '0' && char <= '9') {
      if (!isValidNumber) isValidNumber = checkIfaSymbolIsAdjacent({ row, col }, symbolsCoordinates);
      number += char;
    } else if (number) {
      if (isValidNumber) foundNumbers.push(Number.parseInt(number));
      number = '';
      isValidNumber = false;
    }
  });

  if (number && isValidNumber) {
    foundNumbers.push(Number.parseInt(number));
  }
});

const result = foundNumbers.reduce((a, b) => a + b, 0);

console.log(`Day 3 part 1 - result : ${result}`);