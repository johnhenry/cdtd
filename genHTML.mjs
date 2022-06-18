import CSSQueryToHTML from "./CSSQueryToHTML.mjs";
import { createQueries } from "./index.mjs";
const genHTML = (textCDTD) => {
  const queries = createQueries(textCDTD)[0].map((array) =>
    array.split(" ").map((item) => item.replace(/:(\S+)/g, ""))
  );
  const longestIndex = queries
    .map((a) => a.length)
    .indexOf(Math.max(...queries.map((a) => a.length)));
  const selector = queries[longestIndex].join(">");
  return CSSQueryToHTML(selector);
};

export default genHTML;
export { genHTML };
