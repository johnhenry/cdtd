import cheerio from "cheerio";
import joinSelectors from "./join-selectors.mjs";
import CDTD_NEGATIVE_QUERY from "./negate.mjs";

const invalidate = (text, queries) => {
  const $ = cheerio.load(text);
  for (const query of queries) {
    if (!query.length) {
      continue;
    }
    if (query[0] === CDTD_NEGATIVE_QUERY) {
      const q = joinSelectors(query.slice(1));
      const qu = $(q);
      if (qu.length) {
        return `+: ${q}
${qu.toString()}`;
      }
    } else {
      const q = joinSelectors(query);
      if (!$(q).length) {
        return `-: ${q}`;
      }
    }
  }
  return;
};

const validate = (...args) => !invalidate(...args);
export { validate, invalidate };
export default validate;
