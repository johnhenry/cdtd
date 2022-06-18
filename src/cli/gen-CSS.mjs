import CDTD_NEGATIVE_QUERY from "../negate.mjs";
import collapseSelectors from "./collapse-selectors.mjs";

const toCSS = (query) => `${query} {${"\n\n"}}`;
const genCSS = (baseQueries) => {
  const queries = baseQueries.map((x) => x.join(" "));

  return queries.map((query) => [query, toCSS(query)]);
};
export default genCSS;
export { genCSS };
