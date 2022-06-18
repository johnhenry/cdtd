import cheerio from "cheerio";

const invalidate = (text, queries, unqueries) => {
  const $ = cheerio.load(text);
  for (const query of queries) {
    if (!$(query).length) {
      return `- ${query}`;
    }
  }
  for (const query of unqueries) {
    if ($(query).length) {
      return `+ ${query}`;
    }
  }
  return;
};

const validate = (...args) => !invalidate(...args);

export { validate, invalidate };
export default validate;
