export const join = (query, joiner = " ") =>
  query.join(joiner).replaceAll(`${joiner}&`, "");
export default join;
