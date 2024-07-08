import { fileURLToPath } from "url";
import { dirname } from "path";
import { readInput } from "../common/readInput.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INPUT_FILE_NAME = "input.txt";
const INPUT_FILE_PATH = `${__dirname}/${INPUT_FILE_NAME}`;

const rawInput = await readInput(INPUT_FILE_PATH);

let scratchcards = [];
rawInput.forEach((line, cardId) => {
  const numbers = line.split(': ')[1].split(/\s*\|\s*/);
  const winningNumbers = numbers[0].split(/\s+/).map(Number);
  const scratchedNumbers = numbers[1].split(/\s+/).map(Number);

  const cardsWonNb = scratchedNumbers.filter(num => winningNumbers.includes(num)).length;

  scratchcards[cardId] = (scratchcards[cardId] ?? 0) + 1;

  for (let i = 1; i <= cardsWonNb; i++) {
    scratchcards[cardId + i] = (scratchcards[cardId + i] ?? 0) + scratchcards[cardId];
  }
});

const result = scratchcards.reduce((a, b) => a + b, 0)

console.log(`Day 3 part 1 - result: ${result}`);
