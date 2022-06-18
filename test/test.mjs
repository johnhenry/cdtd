import { readFileSync } from "node:fs";
import { invalidate, createQueries } from "../src/index.mjs";
import genHTML from "../src/gen-HTML.mjs";
import genCSS from "../src/gen-CSS.mjs";
const testCDTD = readFileSync("./test/0.cdtd", "utf8");
const testHTML = readFileSync("./test/0.html", "utf8");

console.log(...createQueries(testCDTD.split("\n")));
const invalid = invalidate(testHTML, testCDTD);
if (invalid) {
  console.log("\x1b[31m", invalid, "\x1b[0m");
  console.log(invalid);
  console.log("\x1b[0m");
}
console.log(genHTML(testCDTD));
console.log(genCSS(testCDTD));
