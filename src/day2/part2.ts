import * as fs from "fs";

type Color = "red" | "green" | "blue";
type RoundSetupType = Record<Color, number>;

const startTime = performance.now();

const filePath = `${__dirname}/input.txt`;
const fileContent = fs.readFileSync(filePath, "utf-8").trim().split("\n");

const result = fileContent.reduce((total, game) => {
  const rounds = game.split(":")[1].split(";");
  let roundSetup: RoundSetupType = {
    red: 0,
    green: 0,
    blue: 0,
  };

  for (const round of rounds) {
    const draws = round.trim().split(",");
    for (const draw of draws) {
      const [nb, color] = draw.trim().split(" ") as [number, Color];
      roundSetup[color] = Math.max(roundSetup[color], +nb);
    }
  }

  const { red, green, blue } = roundSetup;
  return total + red * blue * green;
}, 0);

const time = performance.now() - startTime;

console.log(`Result: ${result}. Ran day 2 part 2 in ${time}ms.`);
