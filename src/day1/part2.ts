import * as fs from "fs";

const startTime = performance.now();

const filePath = `${__dirname}/input.txt`;
const rawFileContent = fs.readFileSync(filePath, "utf-8");
const fileContent = rawFileContent.split("\n");

const digitNames = [
  { key: "one", value: "o1e" },
  { key: "two", value: "t2o" },
  { key: "three", value: "t3e" },
  { key: "four", value: "f4r" },
  { key: "five", value: "f5e" },
  { key: "six", value: "s6x" },
  { key: "seven", value: "s7n" },
  { key: "eight", value: "e8t" },
  { key: "nine", value: "n9e" },
];

const result = fileContent.reduce((result, current) => {
  let formattedLine = current;
  digitNames.forEach((digit) => {
    formattedLine = formattedLine.replaceAll(digit.key, digit.value);
  });

  const onlyDigits = formattedLine.replace(/\D/g, "");
  const stringfiedValue =
    onlyDigits?.length >= 2
      ? `${onlyDigits[0]}${onlyDigits[onlyDigits.length - 1]}`
      : `${onlyDigits[0]}${onlyDigits[0]}`;
  const value = +stringfiedValue;
  return result + value;
}, 0);

const time = performance.now() - startTime;

console.log(`Result: ${result}. Ran day 1 part 2 in ${time}ms.`);
