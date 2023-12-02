import * as fs from "fs";

type Color = "red" | "green" | "blue";
enum MAX_ALLOWED {
  red = 12,
  green = 13,
  blue = 14,
}

const startTime = performance.now();

const filePath = `${__dirname}/input.txt`;
const fileContent = fs.readFileSync(filePath, "utf-8").trim().split("\n");

const result = fileContent.reduce((total, game, gameIndex) => {
  const rounds = game.split(":")[1].split(";");
  let maxReached = false;

  for (const round of rounds) {
    const draws = round.trim().split(",");
    if (
      draws.some((draw) => {
        const [nb, color] = draw.trim().split(" ") as [number, Color];
        return +nb > MAX_ALLOWED[color];
      })
    ) {
      maxReached = true;
      break;
    }
    if (maxReached) break;
  }
  return maxReached ? total : total + gameIndex + 1;
}, 0);

const time = performance.now() - startTime;

console.log(`Result: ${result}. Ran day 2 part 1 in ${time}ms.`);
