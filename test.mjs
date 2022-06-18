import { invalidate, createQueries } from "./index.mjs";
const testHTML = `<ul class="thingy">
  <li></li>
  <li><div></li>
</ul>
`;
const testCTDT = `ul {
  &.thingy;
  ,2 li {
    div;
  };
};
`;
console.log(createQueries(testCTDT));
const invalid = invalidate(testHTML, testCTDT);
if (invalid) {
  console.log(invalid);
}
