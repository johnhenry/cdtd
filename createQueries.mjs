const importMatch = /@import "(.+)";/;
const nestedStart = /(.+){/;
const nestedEnd = /}/;
const simpleMatch = /(.+);/;
const repeatsMatch = /([\d,]+) (.+)/;
const join = (query) => query.join(" ").replace(/\s+&/g, "");
const getQueries = (q, parent) => {
  let query,
    repeat = "";
  if (repeatsMatch.test(q)) {
    [, repeat, query] = q.match(repeatsMatch);
  } else {
    query = q;
  }
  const main = [...parent, query];
  const queries = [main];
  const unqueries = [];
  const [l, upper] = repeat.split(",").map(Number);
  const lower = l === 0 ? 1 : l;
  if (repeat) {
    if (upper === undefined) {
      //--n
      queries.push([...main, `&:nth-child(${lower})`]);
      unqueries.push([...main, `&:nth-child(${lower + 1})`]);
    } else if (lower > upper) {
      //--n,
      queries.push([...main, `&:nth-child(${lower})`]);
    } else {
      //--n,m
      queries.push([...main, `&:nth-child(${lower})`]);
      unqueries.push([...main, `&:nth-child(${upper + 1})`]);
    }
  }

  return { query, queries, unqueries };
};
export default (cdtd = "") => {
  const lines = cdtd.split("\n");
  const queries = [];
  const unqueries = [];
  const parent = [];
  for (const l of lines) {
    const line = l.trim();
    if (!line) {
      continue;
    }
    if (nestedStart.test(line)) {
      const [, query] = line.match(nestedStart);
      const q = getQueries(query.trim(), parent);
      if (q.queries.length) {
        queries.push(...q.queries.map(join));
      }
      if (q.unqueries.length) {
        unqueries.push(...q.unqueries.map(join));
      }
      parent.push(q.query);
    } else if (nestedEnd.test(line)) {
      parent.pop();
    } else if (simpleMatch.test(line)) {
      const [, query] = line.match(simpleMatch);
      const q = getQueries(query.trim(), parent);
      if (q.queries.length) {
        queries.push(...q.queries.map(join));
      }
      if (q.unqueries.length) {
        unqueries.push(...q.unqueries.map(join));
      }
    }
  }
  return [queries, unqueries];
};
