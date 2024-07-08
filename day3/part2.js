import { fileURLToPath } from "url";
import { dirname } from "path";
import { readInput } from "../common/readInput.js";


const checkIfaGearIsAdjacent = (numberCoordinates, gearsCoordinates) => {
  const { row, col } = numberCoordinates;
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 0], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  return gearsCoordinates.find(({ row: gearRow, col: gearCol }) =>
    directions.some(([dRow, dCol]) =>
      row + dRow === gearRow && col + dCol === gearCol
    )
  );
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INPUT_FILE_NAME = "input.txt";
const INPUT_FILE_PATH = `${__dirname}/${INPUT_FILE_NAME}`;

const rawInput = await readInput(INPUT_FILE_PATH);

const gearSymbol = /\*/g;

let gearsCoordinates = []
rawInput.forEach((line, row) => {
  let match;

  // succesive matches - from MDN example https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
  while ((match = gearSymbol.exec(line)) !== null) {
    gearsCoordinates.push({ row, col: match.index });
  }
});


let foundPartsMap = new Map();
rawInput.forEach((line, row) => {
  let partNb = '';
  let isValidPartNb = false;
  let savedAdjacentGearCoordinates;

  for (let col = 0; col < line.length; col++) {
    const char = line[col];
    if (char >= '0' && char <= '9') {
      const currentAdjacentGearCoordinates = checkIfaGearIsAdjacent({ row, col }, gearsCoordinates);
      if (!isValidPartNb) {
        isValidPartNb = !!currentAdjacentGearCoordinates;
        if (isValidPartNb) savedAdjacentGearCoordinates = currentAdjacentGearCoordinates;
      }
      partNb += char;
    } else if (partNb) {
      if (isValidPartNb && savedAdjacentGearCoordinates) {
        if (!foundPartsMap.has(savedAdjacentGearCoordinates)) {
          foundPartsMap.set(savedAdjacentGearCoordinates, []);
        }
        foundPartsMap.get(savedAdjacentGearCoordinates).push(Number(partNb));
      }
      partNb = '';
      isValidPartNb = false;
      savedAdjacentGearCoordinates = null;
    }
  }

  if (partNb && isValidPartNb && savedAdjacentGearCoordinates) {
    if (!foundPartsMap.has(savedAdjacentGearCoordinates)) {
      foundPartsMap.set(savedAdjacentGearCoordinates, []);
    }
    foundPartsMap.get(savedAdjacentGearCoordinates).push(Number(partNb));
  }
});

const result = [...foundPartsMap.values()].filter(parts => parts.length === 2).reduce((sum, parts) => {
  const product = parts.reduce((product, part) => product * part, 1);
  return sum + product;
}, 0);

console.log(`Day 3 part 2 - result : ${result}`);