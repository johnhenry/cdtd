import createQueries, { createQueries2 } from "./createQueries.mjs";
import {
  validate as validateQueries,
  invalidate as invalidateQueries,
} from "./runQueries.mjs";
const validate = (textHTML = "", textCDTD = "") => {
  return validateQueries(textHTML, ...createQueries(textCDTD));
};
const invalidate = (textHTML = "", textCDTD = "") => {
  return invalidateQueries(textHTML, ...createQueries(textCDTD));
};

export default validate;
export {
  validate,
  invalidate,
  validateQueries,
  invalidateQueries,
  createQueries,
};
