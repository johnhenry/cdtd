import emmet from "emmet";
import CDTD_NEGATIVE_QUERY from "../negate.mjs";
import joinSelectors from "../join-selectors.mjs";
import collapseSelectors from "./collapse-selectors.mjs";

const genHTML = (baseQueries) => {
  const queries = baseQueries
    .map((array) =>
      array.map((item) => item.replace(/(:.+)/g, "").replaceAll("*", ""))
    )
    .map((query) => joinSelectors(query, ">"));
  return queries.map((query) => [query, emmet.default(query)]);
};
export default genHTML;
export { genHTML };
