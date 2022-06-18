import CDTD_NEGATIVE_QUERY from "./negate.mjs";
import { createQueries } from "./index.mjs";
import collapseSelectors from "./collapse-selectors.mjs";

const genCSS = (textCDTD, { nested = false } = { nested: false }) => {
  if (nested) {
    throw new Error("nested css not implemented");
  }
  return [...createQueries(textCDTD.split("\n"))]
    .filter(([n]) => n !== CDTD_NEGATIVE_QUERY)
    .map(collapseSelectors)
    .map((x) => x.join(" "))
    .map((query) => `${query} {${"\n\n"}}`)
    .join("\n");
};
export default genCSS;
export { genCSS };
