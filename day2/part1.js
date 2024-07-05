import { fileURLToPath } from "url";
import { dirname } from "path";
import { readInput } from "../common/readInput.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INPUT_FILE_NAME = "input.txt";
const INPUT_FILE_PATH = `${__dirname}/${INPUT_FILE_NAME}`;

const rawInput = await readInput(INPUT_FILE_PATH);

const gameColorLimits = {
  red: 12,
  green: 13,
  blue: 14
};

let result = 0;

rawInput.forEach((game, index) => {
  const gameData = game.split(": ")[1];
  const gameSets = gameData.split("; ");

  const gameColorMaxStats = {
    red: 0,
    blue: 0,
    green: 0,
  };

  gameSets.forEach((gameSet) => {
    gameSet.split(", ").forEach((draw) => {
      const [colorCount, color] = draw.split(" ");
      gameColorMaxStats[color] = Math.max(gameColorMaxStats[color], Number(colorCount));
    });
  });

  const isExceedsLimits = Object.entries(gameColorMaxStats).some(
    ([color, count]) => count > gameColorLimits[color]
  );

  if (!isExceedsLimits)
    result += index + 1;
});

console.log(`Day 2 part 1 - result : ${result}`);
