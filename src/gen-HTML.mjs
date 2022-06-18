import emmet from "emmet";
import CDTD_NEGATIVE_QUERY from "./negate.mjs";
import { createQueries } from "./index.mjs";
import joinSelectors from "./join-selectors.mjs";
import collapseSelectors from "./collapse-selectors.mjs";
import getLongest from "./get-longest.mjs";
import getLongests from "./get-longests.mjs";

const genHTML = (
  textCDTD,
  { strategy = "longests" } = { strategy: "longests" }
) => {
  const queries = [...createQueries(textCDTD.split("\n"))]
    .filter(([n]) => n !== CDTD_NEGATIVE_QUERY)
    .map(collapseSelectors)
    .map((array) =>
      array.map((item) => item.replace(/(:.+)/g, "").replaceAll("*", ""))
    );

  if (typeof strategy === "number") {
    return emmet.default(joinSelectors(queries[strategy], ">"));
  }

  switch (strategy) {
    case "longest":
      return emmet.default(joinSelectors(getLongest(...queries), ">"));
    case "first":
      return emmet.default(joinSelectors(queries[0], ">"));
    case "last":
      return emmet.default(joinSelectors(queries[queries.length - 1], ">"));
    case "all":
      return queries
        .map((query) => joinSelectors(query, ">"))
        .map(emmet.default)
        .join("\n");
    default:
    case "longests":
      return [
        ...new Set(
          getLongests(...queries).map((query) => joinSelectors(query, ">"))
        ),
      ]
        .map(emmet.default)
        .join("\n");
  }
};

export default genHTML;
export { genHTML };
