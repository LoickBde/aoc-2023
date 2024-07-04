import { fileURLToPath } from "url";
import { dirname } from "path";
import { readInput } from "../common/readInput";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INPUT_FILE_NAME = "input.txt";
const INPUT_FILE_PATH = `${__dirname}/${INPUT_FILE_NAME}`;

const rawInput = await readInput(INPUT_FILE_PATH);

const letters = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const regex = new RegExp(`(?=(?<digit>[0-9]|${letters.join("|")}))`, "g");
const numbers = rawInput.map((line) => {
  const first = [...line.matchAll(regex)]?.at(0)?.groups?.digit ?? "0";
  const last = [...line.matchAll(regex)]?.at(-1)?.groups?.digit ?? "0";
  const a = Number.isNaN(+first) ? letters.indexOf(first) : +first;
  const b = Number.isNaN(+last) ? letters.indexOf(last) : +last;
  return a * 10 + b;
});
const result = numbers.reduce((a, b) => a + b, 0);

console.log(`Day 1 part 2 - result : ${result}`);
