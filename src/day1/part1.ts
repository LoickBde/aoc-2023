import * as fs from "fs";

const startTime = performance.now();

const filePath = `${__dirname}/input.txt`;
const rawFileContent = fs.readFileSync(filePath, "utf-8");
const fileContent = rawFileContent.split("\n");

const result = fileContent.reduce((result, current) => {
  const onlyDigits = current.replace(/\D/g, "");
  const stringfiedValue =
    onlyDigits?.length >= 2
      ? `${onlyDigits[0]}${onlyDigits[onlyDigits.length - 1]}`
      : `${onlyDigits[0]}${onlyDigits[0]}`;
  const value = +stringfiedValue;

  return result + value;
}, 0);

const time = performance.now() - startTime;

console.log(`Result: ${result}. Ran day 1 part 1 in ${time} ms.`);
