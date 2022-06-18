import createQueries from "./create-queries.mjs";
import { invalidate as invalidateQueries } from "./run-queries.mjs";
export const invalidate = (textHTML = "", textCDTD = "") => {
  return invalidateQueries(textHTML, createQueries(textCDTD.split("\n")));
};
export const validate = (...args) => !invalidate(...args);
export default validate;
export { createQueries };
