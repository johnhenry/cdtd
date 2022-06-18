import createQueries from "./create-queries.mjs";
import { invalidate as invalidateQueries } from "./run-queries.mjs";
export const invalidate = (textHTML = "", textCDTD = "") => {
  return (
    invalidateQueries(textHTML, createQueries(textCDTD.split("\n"))) || []
  ).join("\n");
};
export const pass = (...args) => !invalidate(...args);
export const error = (...args) => {
  const result = invalidate(...args);
  if (result) {
    throw new Error(result.join("\n"));
  }
};

export default error;
