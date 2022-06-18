import quiz, {
  ok,
  notok,
  throws,
  doesnotthrow,
  equal,
  deepequal,
} from "pop-quiz";

import { error, invalidate, pass } from "../src/index.mjs";
quiz(function* () {
  yield ok(pass("<div>", "div"));
  yield notok(pass("<div>", "span"));
  yield equal(invalidate("<div>", "div"), "");
  yield equal(invalidate("<div>", "span"), "-:span");
  yield doesnotthrow(() => error("<div>", "div"));
  yield throws(() => error("<div>", "span"));
});
