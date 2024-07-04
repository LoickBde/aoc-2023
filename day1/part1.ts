import { fileURLToPath } from "url";
import { dirname } from "path";
import { readInput } from "../common/readInput";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INPUT_FILE_NAME = "input.txt";
const INPUT_FILE_PATH = `${__dirname}/${INPUT_FILE_NAME}`;

const rawInput = await readInput(INPUT_FILE_PATH);

const numbers = rawInput.map((line) => {
  const first = Number.parseInt(line.match(/[0-9]/g)?.at(0) ?? "0");
  const last = Number.parseInt(line.match(/[0-9]/g)?.at(-1) ?? "0");
  return first * 10 + last;
});

const result = numbers.reduce((a, b) => a + b, 0);

console.log(`Day 1 part 1 - result : ${result}`);
