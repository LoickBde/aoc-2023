import { fileURLToPath } from "url";
import { dirname } from "path";
import { readInput } from "../common/readInput.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INPUT_FILE_NAME = "input.txt";
const INPUT_FILE_PATH = `${__dirname}/${INPUT_FILE_NAME}`;

const rawInput = await readInput(INPUT_FILE_PATH);

let result = 0;

rawInput.forEach(line => {
  const numbers = line.split(': ')[1].split(/\s*\|\s*/);
  const winningNumbers = numbers[0].split(/\s+/).map(Number);
  const scratchedNumbers = numbers[1].split(/\s+/).map(Number);

  const matchedNumbers = scratchedNumbers.filter(num => winningNumbers.includes(num));

  if (matchedNumbers.length) result += 2 ** (matchedNumbers.length - 1);
});

console.log(`Day 3 part 1 - result: ${result}`);
